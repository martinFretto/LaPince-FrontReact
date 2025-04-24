import { useState } from "react";
import DonutChart from "../components/Donught";
import LastExpenses from "../components/LastExpenses";
import ExpensesModal from "../components/Modals/ExpensesModal";

export default function Dashboard() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedExpense, setSelectedExpense] = useState(null);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleExpenseClick = (expense: any) => {
		setSelectedExpense(expense);
		setIsOpen(true);
	};

	return (
		<div className="sm:mx-10 3xl:mx-90 4xl:mx-120">
			<DonutChart />
			<LastExpenses onExpenseClick={handleExpenseClick} />
			<ExpensesModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				selectedExpense={selectedExpense}
				setSelectedExpense={setSelectedExpense}
				selectedBudget={0}
				fetchExpenses={() => {}}
				triggerReload={() => {}}
			/>
		</div>
	);
}
