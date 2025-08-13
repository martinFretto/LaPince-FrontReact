import { useEffect, useState } from "react";
import { addBudget, deleteBudget, updateBudget } from "../../api/budgets";
import type { Budget, ModifBudget, NewBudget } from "../../types/budget";
import { ButtonSpinner, PageSpinner } from "../Spinner";

interface BudgetModalProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void,
	selectedBudget: Budget | null;
	setSelectedBudget: (budget: Budget | null) => void;
	refreshData: () => void | Promise<void>;
}

export default function BudgetModal({
	isOpen,
	setIsOpen,
	selectedBudget,
	refreshData,
}: BudgetModalProps) {
	const [name, setName] = useState("");
	const [allocated_amount, setAllocated_amount] = useState("");
	const [icon, setIcon] = useState("");
	const [warning_amount, setWarning_amount] = useState("");
	const [color, setColor] = useState("#A5D8FF");
	const [icons, setIcons] = useState<{ name: string; src: string }[]>([]);
	const [isOpenDelete, setIsOpenDelete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	// Importation dynamique de tous les .svg
	useEffect(() => {
		const imports = import.meta.glob("/src/assets/icons/*.svg", {
			eager: true,
		}) as Record<string, { default: string }>;
		const loadedIcons = Object.entries(imports).map(([path, module]) => {
			const name = path.split("/").pop()?.replace(".svg", "") || "icon";
			return { name, src: module.default };
		});
		setIcons(loadedIcons);
	}, []);

	useEffect(() => {
		if (isOpen && selectedBudget) {
			setName(selectedBudget.name?.toString());
			setAllocated_amount(selectedBudget.allocated_amount?.toString());
			setIcon(selectedBudget.icon);
			setWarning_amount(selectedBudget.warning_amount?.toString());
			setColor(selectedBudget.color ?? "#A5D8FF");
		}
	}, [isOpen, selectedBudget]);

	useEffect(() => {
		if (isOpen && !selectedBudget) {
			// Forcer le vidage dans ce cas précis
			setName("");
			setAllocated_amount("");
			setIcon("");
			setWarning_amount("");
			setColor("#A5D8FF");
		}
	}, [isOpen, selectedBudget]);


	const handleSubmit = async (budgetId?: number) => {
		setIsLoading(true);
		if(budgetId){
			handleUpdate(budgetId);
		} else {
			handleAdd();
		}
	}

	// Ajout d'un nouveau budget
	const handleAdd = async () => {
		setIsLoading(true);
		const newBudget: NewBudget = {
			name,
			allocated_amount: Number.isNaN(Number(allocated_amount))
				? 0
				: Number(allocated_amount),
			icon,
			warning_amount: Number.isNaN(Number(warning_amount))
				? 0
				: Number(warning_amount),
			color,
		};

		try {
			await addBudget(newBudget);
			await refreshData();
		
			setIsOpen(false);
			setErrorMessage("");
		} catch (error:unknown) {
			if(error instanceof Error){
				setErrorMessage(error.message)
			} else {
				setErrorMessage("La création du budget a échoué.")
			}
		} finally {
			setIsLoading(false);
		}
	};

	// Modification d'un budget
	const handleUpdate = async (budgetId: number) => {
		const budgetToSend: ModifBudget = {
			name,
			allocated_amount: Number(allocated_amount) || 0,
			icon: icon ?? "",
			warning_amount: Number(warning_amount) || 0,
			color,
		};
		try {
			await updateBudget(budgetToSend, budgetId);
			await refreshData();
			setIsOpen(false);
			setErrorMessage("");
		} catch (error:unknown) {
			if(error instanceof Error){
				setErrorMessage(error.message)
			} else {
				setErrorMessage("La modification du budget a échoué.")
			}
		} finally {
			setIsLoading(false);
		}
	};

	// Suppression d'un budget
	const handleDelete = async (selectedBudget: { id: number; name: string }) => {
		setIsLoading(true);
		try{
			await deleteBudget(selectedBudget.id);
			await refreshData();		
		} catch{
			setErrorMessage("La suppression a échoué.")
		} finally{
			setIsOpenDelete(false);
			setIsLoading(false);
			setIsOpen(false);
		}
				
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="fixed inset-0 bg-transparent backdrop-blur-[2px]" />

			{/* <div className="border-[#1971c2] border-2 rounded-xl p-6 w-full max-w-md md:max-w-lg relative z-10 mx-4 bg-[#f8f9fa] shadow-xl"> */}
			{/* Modale */}
			<div className="border-[#1971c2] border-2 rounded-xl p-6 w-full max-w-md md:max-w-lg relative z-10 mx-4 bg-[#f8f9fa] shadow-xl">
				<div className="flex flex-col">
					{/* En-tête */}
					<div className="relative mb-6">
						<button
							type="button"
							onClick={() => {
								setErrorMessage("");
								setIsOpen(false);}}
							className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
						>
							✕
						</button>
						<h2 className="text-lg font-medium text-black text-center w-full">
							{selectedBudget
								? `Modifier le budget ${selectedBudget.name}`
								: "Ajouter un budget"}
						</h2>
					</div>

					{/* Formulaire */}
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit(selectedBudget?.id);
						}}
						className="flex flex-col md:flex-row md:flex-wrap md:justify-between gap-4"
					>
						{/* Titre */}
						<div className="w-full md:w-[48%]">
							<label className="block mb-1 text-black" htmlFor="name">
								Titre du budget
							</label>
							<input
								id="name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="validator border border-gray-300 rounded p-2 w-full bg-white"
								required
							/>
						</div>

						{/* Montant alloué */}
						<div className="w-full md:w-[48%]">
							<label
								className="block mb-1 text-black"
								htmlFor="allocated_amount"
							>
								Montant alloué (€)
							</label>
							<div className="relative">
								<input
									id="allocated_amount"
									type="number"
									min="0.01"
    								step="0.01"
									value={allocated_amount}
									onChange={(e) => setAllocated_amount(e.target.value)}
									className="validator border border-gray-300 rounded p-2 w-full bg-white"
									required
								/>
							</div>
						</div>

						{/* Icônes en grille */}
						<div className="w-full">
							<label className="block mb-2 text-black" htmlFor="icon">
								Choisissez une icône
							</label>
							<div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto">
								{icons.map((i, index) => (
									<img
										id="icon"
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={index}
										src={i.src}
										alt={i.name}
										title={i.name}
										loading="lazy"
										onClick={() => setIcon(i.src)}
										className={`validator w-10 h-10 p-1 border rounded cursor-pointer transition ${
											icon === i.src
												? "border-blue-500 bg-blue-100"
												: "border-gray-300"
										}`}
										aria-required
									/>
								))}
							</div>
							{icon && (
								<div className="mt-2 text-center">
									<p className="text-sm text-gray-600">Icône sélectionnée :</p>
									<img
										src={icon}
										alt="Icône sélectionnée"
										className="w-8 h-8 mx-auto"
									/>
								</div>
							)}
						</div>
						{/* {icon?.length} */}

						{/* Seuil d'alerte */}
						<div className="w-full md:w-[48%]">
							<label className="block mb-1 text-black" htmlFor="warning_amount">
								Seuil d'alerte (€)
							</label>
							<div className="relative">
								<input
									id="warning_amount"
									type="number"
									min="0.01"
    								step="0.01"
									value={warning_amount}
									onChange={(e) => setWarning_amount(e.target.value)}
									className="validator border border-gray-300 rounded p-2 w-full bg-white"
									required
								/>
							</div>
						</div>

						{/* Couleur */}
						<div className="w-full md:w-[48%]">
							<label className="block mb-1 text-black" htmlFor="color">
								Choisissez une couleur
							</label>
							<input
								id="color"
								type="color"
								value={color}
								onChange={(e) => setColor(e.target.value)}
								className="validator border border-gray-300 rounded p-1 w-full h-10 bg-white"
								required
							/>
						</div>

						{/* Bouton Valider */}
						<div className="flex justify-center items-center mt-8 w-full">
							{selectedBudget ? (
								<button
									type="submit"
									className="bg-[#4dabf7] border-2 border-[#1971c2] text-white text-md font-normal hover:cursor-pointer px-8 py-2 rounded"
								>
									{isLoading ? <ButtonSpinner /> : "Modifier"}
								</button>
							) : (
								<button
									type="submit"
									className="bg-[#4dabf7] border-2 border-[#1971c2] text-white text-md font-normal hover:cursor-pointer px-8 py-2 rounded"
								>
									{isLoading ? <ButtonSpinner /> : "Ajouter"}
								</button>
							)}
						</div>
					</form>

					{/* Condition d'affichage de la poubelle pour supprimer la dépense en fonction de si une dépense est séléctionnée */}
					{selectedBudget ? (
						<div className="flex justify-center">
							<img
								src="/trash-alt-svgrepo-com.svg"
								alt="Supprimer"
								className="absolute w-8 bottom-8 right-5 cursor-pointer"
								onClick={() => setIsOpenDelete(true)}
							/>
							{/* Modal de confirmation avec DaisyUI */}
							<div
								className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${isOpenDelete ? "block" : "hidden"}`}
							>
								<div className="modal modal-open">
									<div className="modal-box">
										<h2 className="text-xl font-bold text-center">
											Êtes-vous sûr de vouloir supprimer le budget{" "}
											{selectedBudget.name} ?
										</h2>
										<div className="flex justify-center mt-4">
											<button
												type="button"
												className="btn btn-success"
												onClick={() => {
													handleDelete(selectedBudget);			
												}}
											>
												{isLoading ? <ButtonSpinner /> : "Confirmer"}
											</button>
											<button
												type="button"
												className="btn btn-error ml-2"
												onClick={() => setIsOpenDelete(false)}
											>
												Annuler
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						""
					)}
					{errorMessage && (
						<span className="text-red-500 text-md font-bold block text-center">
							{errorMessage}
						</span>
					)}
				</div>
			</div>
		{isLoading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
          <PageSpinner />
        </div>
      )}
		</div>
	);
}
