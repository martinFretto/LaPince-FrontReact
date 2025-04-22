import { useEffect, useState } from "react";
import { AddBudget, DeleteBudget, updateBudget } from "../../api/budget";
import type { Budget, ModifBudget, NewBudget } from "../../types/budget";

interface BudgetModalProps {
	isModalOpen: boolean;
	onClose: () => void;
	selectedBudget: Budget | null;
	setSelectedBudget: (budget: Budget | null) => void;
}

export default function BudgetModal({
	isModalOpen,
	onClose,
	selectedBudget,
}: BudgetModalProps) {
	const [name, setName] = useState("");
	const [allocated_amount, setAllocated_amount] = useState("");
	const [icon, setIcon] = useState("");
	const [warning_amount, setWarning_amount] = useState("");
	const [color, setColor] = useState("#A5D8FF");
	const [icons, setIcons] = useState<{ name: string; src: string }[]>([]);

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
		if (isModalOpen && selectedBudget) {
			setName(selectedBudget.name?.toString());
			setAllocated_amount(selectedBudget.allocated_amount?.toString());
			setIcon(selectedBudget.icon);
			setWarning_amount(selectedBudget.warning_amount?.toString());
			setColor(selectedBudget.color ?? "#A5D8FF");
		}
	}, [isModalOpen, selectedBudget]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isModalOpen && !selectedBudget) {
			// Forcer le vidage dans ce cas précis
			setName("");
			setAllocated_amount("");
			setIcon("");
			setWarning_amount("");
			setColor("#A5D8FF");
		}
	}, [isModalOpen]);

	// Ajout d'un nouveau budget
	const handleAdd = async () => {
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
			await AddBudget(newBudget);
			console.log(`Budget ${name} ajouté avec succès !`);
			onClose();
		} catch (error) {
			console.error("Erreur lors de l'ajout du budget :", error);
		}
	};

	// Modification du budget
	const handleUpdate = async (selectedBudget: number) => {
		console.log(`handleUpdate du budget n°: ${selectedBudget}`);

		const budgetToSend: ModifBudget = {
			name,
			// allocated_amount: Number(allocated_amount) || 0,
			icon,
			// warning_amount: Number(warning_amount) || 0,
			color,
			// selectedBudget: 0,
		};

		try {
			await updateBudget(budgetToSend, selectedBudget);
			console.log("Budget modifié avec succès !");
		} catch (error) {
			console.error("Erreur lors de la mise à jour du budget :", error);
		}
	};

	// Suppression du budget
	const handleDelete = (selectedBudget: { id: number; name: string }) => {
		console.log(selectedBudget.id);

		console.log(
			`essai de suppression du budget ${selectedBudget.id} ${selectedBudget.name} `,
		);
		DeleteBudget(selectedBudget.id);
	};

	if (!isModalOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="fixed inset-0 bg-transparent backdrop-blur-[2px]" />

			{/* Modale */}
			<div className="border-[#1971c2] border-2 rounded-xl p-6 w-full max-w-md md:max-w-lg relative z-10 mx-4 bg-[#f8f9fa] shadow-xl">
				<div className="flex flex-col">
					{/* En-tête */}
					<div className="relative mb-6">
						<button
							type="button"
							onClick={onClose}
							className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
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
					<div className="flex flex-col md:flex-row md:flex-wrap md:justify-between gap-4">
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
								className="border border-gray-300 rounded p-2 w-full bg-white"
							/>
							{name}
						</div>

						{/* Montant alloué */}
						<div className="w-full md:w-[48%]">
							<label
								className="block mb-1 text-black"
								htmlFor="allocated_amount"
							>
								Montant alloué
							</label>
							<div className="relative">
								<input
									id="allocated_amount"
									type="number"
									value={allocated_amount}
									onChange={(e) => setAllocated_amount(e.target.value)}
									className="border border-gray-300 rounded p-2 w-full bg-white"
								/>
								<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
									€
								</span>
							</div>
							{allocated_amount}
						</div>

						{/* Icônes en grille */}
						<div className="w-full">
							<label className="block mb-2 text-black" htmlFor="icon">
								Choisissez une icône
							</label>
							<div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto">
								{icons.map((i, index) => (
									// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
									<img
										id="icon"
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={index}
										src={i.src}
										alt={i.name}
										title={i.name}
										loading="lazy"
										onClick={() => setIcon(i.src)}
										className={`w-10 h-10 p-1 border rounded cursor-pointer transition ${
											icon === i.src
												? "border-blue-500 bg-blue-100"
												: "border-gray-300"
										}`}
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

						{/* Seuil d'alerte */}
						<div className="w-full md:w-[48%]">
							<label className="block mb-1 text-black" htmlFor="warning_amount">
								Seuil d'alerte
							</label>
							<div className="relative">
								<input
									id="warning_amount"
									type="number"
									value={warning_amount}
									onChange={(e) => setWarning_amount(e.target.value)}
									className="border border-gray-300 rounded p-2 w-full bg-white"
								/>
								<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
									€
								</span>
							</div>
							{warning_amount}
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
								className="border border-gray-300 rounded p-1 w-full h-10 bg-white"
							/>
						</div>
						{color}
					</div>

					{/* Bouton Valider */}
					<div className="flex justify-center mt-8">
						{selectedBudget ? (
							<button
								type="button"
								onClick={() => {
									handleUpdate(selectedBudget.id);
									onClose();
								}}
								className="btn bg-[#4dabf7] border-2 border-[#1971c2] text-white text-md font-normal hover:cursor-pointer px-8 py-2 rounded"
							>
								Modifier
							</button>
						) : (
							<button
								type="button"
								onClick={() => {
									handleAdd();
									onClose();
								}}
								className="btn bg-[#4dabf7] border-2 border-[#1971c2] text-white text-md font-normal hover:cursor-pointer px-8 py-2 rounded"
							>
								Ajouter
							</button>
						)}
					</div>

					{/* Condition d'affichage de la poubelle pour supprimer la dépense en fonction de si une dépense est séléctionnée */}
					{selectedBudget ? (
						<div>
							{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
							<img
								src="/trash-alt-svgrepo-com.svg"
								alt="Supprimer"
								className="absolute w-8 bottom-7 right-5 cursor-pointer"
								onClick={() => handleDelete(selectedBudget)}
							/>
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}
