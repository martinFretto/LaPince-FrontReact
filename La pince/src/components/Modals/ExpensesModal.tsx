import { useEffect, useState } from "react";
import type { NewExpense, UpdateExpense } from "../../types/Expense";
import { addExpense, DeleteExpense, updateExpense } from "../../api/expenses";

export default function ExpensesModal({
	isOpen,
	setIsOpen,
	selectedExpense,
	setSelectedExpense,
	selectedBudget,
	fetchExpenses,
	triggerReload,
}: {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;

	selectedExpense: any;

	setSelectedExpense: (expense: any) => void;
	selectedBudget: number;
	fetchExpenses: () => void | Promise<void>;
	triggerReload: () => void | Promise<void>;
}) {
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [payment_method] = useState("");
	const [date, setDate] = useState("");

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
			await addExpense(newExpense, selectedBudget);
			await fetchExpenses();
			triggerReload();
			setIsOpen(false);
		} catch (error) {
			console.error("Erreur lors de l'ajout du budget :", error);
		}
	};

	// Modification d'une dépense
	const handleUpdate = async () => {
		const expenseId = selectedExpense.id;
		const expenseToSend: UpdateExpense = {
			amount: Number(amount),
			description,
			payment_method,
			date,
		};
		try {
			await updateExpense(expenseId, expenseToSend);
			await fetchExpenses();
			triggerReload();
		} catch (error) {
			console.error("Erreur lors de l'ajout du budget :", error);
		}
	};

	// suppression d'une dépense
	const handleDelete = async () => {
		try {
			const expenseId = selectedExpense.id;
			await DeleteExpense(expenseId);
			await fetchExpenses();
			setIsOpen(false);
			setSelectedExpense(null);
			console.log(`Dépense ${expenseId} supprimée avec succès !`);
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
						className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
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
						selectedExpense ? handleUpdate() : handleAdd();
						setIsOpen(false);
					}}
					className="space-y-4"
				>
					{/* Montant */}
					<div className="text-center">
						<label className="block mb-1 text-black" htmlFor="number">
							Montant
						</label>
						<div className="relative flex justify-center">
							<input
								id="number"
								type="number"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								className="validator bg-white border border-gray-300 rounded p-2 text-center max-w-[80%]"
								placeholder="0.00"
								required
							/>
							<span className="absolute right-17 top-1/2 transform -translate-y-1/2 text-gray-500">
								€
							</span>
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
					<div className="flex justify-center mt-6">
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
								className="absolute w-8 bottom-6 right-5"
								onClick={handleDelete}
							/>
						</div>
					) : (
						""
					)}
				</form>
			</div>
		</div>
	);
}
