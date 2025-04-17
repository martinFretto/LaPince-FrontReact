import { useState } from "react";
import ExpenseModal from "../components/Modals/AddedExpenses";
import BudgetModal from "../components/Modals/AddedBudget";

export default function PageBlanche() {
	const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
	const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

	const openExpenseModal = () => {
		setIsExpenseModalOpen(true);
	};

	const closeExpenseModal = () => {
		setIsExpenseModalOpen(false);
	};

	const openBudgetModal = () => {
		setIsBudgetModalOpen(true);
	};

	const closeBudgetModal = () => {
		setIsBudgetModalOpen(false);
	};

	return (
		<div className="flex flex-col items-center min-h-[75vh] px-4 py-6">
			<h1 className="text-2xl font-semibold mb-8 text-black">
				Page de test pour les modales
			</h1>

			<div className="w-full max-w-md bg-white border-2 border-[#1971c2] rounded-xl p-6 mb-10">
				<div className="flex flex-col items-center gap-6">
					<p className="text-center text-black">
						Cliquez sur le bouton ci-dessous pour ouvrir la modale
					</p>

					<button
						onClick={openExpenseModal}
						className="btn bg-[#4dabf7] border-2 border-[#1971c2] text-white text-md font-normal hover:cursor-pointer flex place-self-center px-8 py-2 rounded"
					>
						Modal d'ajout de dépense
					</button>
				</div>
			</div>

			<div className="w-full max-w-md bg-white border-2 border-[#1971c2] rounded-xl p-6 mb-10">
				<div className="flex flex-col items-center gap-6">
					<p className="text-center text-black">
						Cliquez sur le bouton ci-dessous pour ouvrir la modale
					</p>

					<button
						onClick={openBudgetModal}
						className="btn bg-[#4dabf7] border-2 border-[#1971c2] text-white text-md font-normal hover:cursor-pointer flex place-self-center px-8 py-2 rounded"
					>
						Modal d'ajout de budget
					</button>
				</div>
			</div>

			{/* Intégration de la modale de dépense */}
			<ExpenseModal
				isOpen={isExpenseModalOpen}
				onClose={closeExpenseModal}
				categoryName="Cadeaux"
			/>

			{/* Intégration de la modale de budget */}
			<BudgetModal isOpen={isBudgetModalOpen} onClose={closeBudgetModal} />
		</div>
	);
}
