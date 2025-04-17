import { useEffect, useState } from "react";

export default function ExpensesModal({
	isOpen,
	setIsOpen,
	selectedExpense,
	setSelectedExpense,
}: {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	selectedExpense: any;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	setSelectedExpense: (expense: any) => void;
}) {
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");

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
				<div className="space-y-4">
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
								className="bg-white border border-gray-300 rounded p-2 text-center max-w-[80%]"
								placeholder="0.00"
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
						<div className="flex justify-center">
							<input
								id="description"
								type="text"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="bg-white border border-gray-300 rounded p-2 text-center max-w-[80%]"
							/>
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
								className="bg-white border border-gray-300 rounded p-2 text-center max-w-[80%]"
							/>
						</div>
					</div>
				</div>

				{/* Bouton Valider */}
				<div className="flex justify-center mt-6">
					<button
						type="button"
						onClick={() => {
							if (selectedExpense) {
								console.log("Modifier:", selectedExpense);
							} else {
								console.log("Ajouter:", { amount, description, date });
							}
							setIsOpen(false);
							setSelectedExpense(null);
						}}
						className="btn bg-[#4dabf7] border-2 border-[#1971c2] text-white text-md font-normal hover:cursor-pointer flex place-self-center px-8 py-1 rounded"
					>
						{selectedExpense ? "Modifier" : "Ajouter"}
					</button>
				</div>
			</div>
		</div>
	);
}
