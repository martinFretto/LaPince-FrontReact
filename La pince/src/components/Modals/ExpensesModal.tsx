import { useEffect, useState } from "react";
import type { Expense, NewExpense, UpdateExpense } from "../../types/expense";
import { addExpense, DeleteExpense, updateExpense } from "../../api/expenses";

export default function ExpensesModal({
	isOpen,
	setIsOpen,
	selectedExpense,
	setSelectedExpense,
	selectedBudget,
	refreshData,
	setIsLoading,
}: {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	selectedExpense: Expense | null;
	setSelectedExpense: (expense: Expense | null) => void;
	selectedBudget: number;
	refreshData: () => void | Promise<void>;
	setIsLoading:(boolean: boolean) => void;
}) {
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [payment_method] = useState("");
	const [date, setDate] = useState("");
	const [isOpenDelete, setIsOpenDelete] = useState(false);
	const remainingLength = Math.max(0, 60 - description?.length);

	useEffect(() => {
		if (isOpen && selectedExpense) {
			setAmount(selectedExpense.amount.toString());
			setDescription(selectedExpense.description);
			setDate(new Date(selectedExpense.date).toISOString().split("T")[0]);
		} else if (isOpen && !selectedExpense) {
			setAmount("");
			setDescription("");
			setDate("");
		}
	}, [isOpen, selectedExpense]);

	const handleSubmit = async () => {
		setIsLoading(true);
		if(selectedExpense){
			handleUpdate()
		} else {
			handleAdd()
		}
	}

	// Ajout d'une nouvelle dépense
	const handleAdd = async () => {
		const budget_id = selectedBudget;
		const newExpense: NewExpense = {
			description,
			payment_method,
			amount: Number(amount),
			date,
			budget_id,
		};
		try {
			await addExpense(newExpense);
			await refreshData();
			setIsOpen(false);
		} catch (error) {
			console.error("Erreur lors de l'ajout du budget :", error);
		}
	};

	// Modification d'une dépense
	const handleUpdate = async () => {
		const expenseId = selectedExpense!.id;
		const expenseToSend: UpdateExpense = {
			amount: Number(amount),
			description,
			payment_method,
			date,
		};
		try {
			await updateExpense(expenseId, expenseToSend);
			await refreshData();
			setIsOpen(false);
		} catch (error) {
			console.error("Erreur lors de l'ajout du budget :", error);
		}
	};

	// Suppression d'une dépense avec confirmation
	const handleDelete = async () => {
		try {
			setIsLoading(true)
			const expenseId = selectedExpense!.id;
			await DeleteExpense(expenseId);
			await refreshData();
			setIsOpen(false);
			setIsOpenDelete(false);
			setSelectedExpense(null);
		} catch (error) {
			console.error("Erreur lors de la suppression :", error);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="relative w-full max-w-lg mx-4 border-[#1971c2] border-2 rounded-xl p-6 bg-[#f8f9fa] overflow-hidden">
				{/* En-tête */}
				<div className="relative mb-4">
					<button
						type="button"
						onClick={() => {
							setSelectedExpense(null);
							setIsOpen(false);
						}}
						className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
					>
						✕
					</button>
					<h2 className="text-lg font-medium text-black text-center w-full">
						{selectedExpense ? "Modifier la dépense" : "Ajouter une dépense"}
					</h2>
				</div>

				{/* Formulaire */}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
						setIsOpen(false);
					}}
					className="space-y-4"
				>
					{/* Montant */}
					<div className="text-center">
						<label className="block mb-1 text-black" htmlFor="number">
							Montant (€)
						</label>
						<div className="relative flex justify-center">
							<input
								id="number"
								min="1"
								type="number"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								className="validator bg-white border border-gray-300 rounded p-2 text-center max-w-[80%]"
								placeholder="0.00"
								required
							/>
						</div>
					</div>

					{/* Description */}
					<div className="text-center">
						<label className="block mb-1 text-black" htmlFor="description">
							Description
						</label>
						<div className="flex flex-col justify-center">
							<textarea
								id="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className=" validator bg-white border border-gray-300 rounded p-2 text-center w-1/1 h-18"
								maxLength={60}
								required
							/>
							<li className="flex items-center text-sm ml-2">
								Reste {remainingLength} caractères
							</li>
						</div>
					</div>

					{/* Date */}
					<div className="text-center">
						<label className="block mb-1 text-black" htmlFor="date">
							Date
						</label>
						<div className="flex justify-center">
							<input
								id="date"
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								className="validator bg-white border border-gray-300 rounded p-2 text-center max-w-[80%]"
								required
							/>
						</div>
					</div>

					{/* Bouton Valider */}
					<div className="flex justify-center my-6">
						<div className="flex justify-center mt-6">
							<button
								type="submit"
								className="btn bg-[#4dabf7] border-2 border-[#1971c2] text-white text-md font-normal hover:cursor-pointer flex place-self-center px-8 py-1 rounded -mb-5"
							>
								{selectedExpense ? "Modifier" : "Ajouter"}
							</button>
						</div>
					</div>

					{/* Condition d'affichage de la poubelle pour supprimer la dépense en fonction de si une dépense est séléctionnée */}
					{selectedExpense ? (
						<div>
							<img
								src="/trash-alt-svgrepo-com.svg"
								alt="image-poubelle"
								className="absolute w-8 bottom-8 right-5 hover:cursor-pointer"
								onClick={() => setIsOpenDelete(true)}
							/>

							{/* Modal de confirmation avec DaisyUI */}
							<div
								className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${isOpenDelete ? "block" : "hidden"}`}
							>
								<div className="modal modal-open">
									<div className="modal-box">
										<h2 className="text-xl font-bold text-center">
											Êtes-vous sûr de vouloir supprimer la dépense{" "}
											{description} ?
										</h2>
										<div className="flex justify-center mt-4">
											<button
												type="button"
												className="btn btn-success"
												onClick={() => {
													handleDelete();
													setIsOpen(false);
												}}
											>
												Confirmer
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
				</form>
			</div>
		</div>
	);
}
