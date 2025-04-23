import { useState } from "react";
import DonutChart from "../components/Donught";
import LastExpenses from "../components/LastExpenses";
import ExpensesModal from "../components/Modals/ExpensesModal";
// import { fetchBudget } from "../api/budget";
// import { fetchExpenses } from "../api/expenses";
// import AlertThresholdModal from "../components/Modals/AlertThresholdModal";
// import AlertExceededModal from "../components/Modals/AlertExceededModal";

export default function Dashboard() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedExpense, setSelectedExpense] = useState(null);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleExpenseClick = (expense: any) => {
		setSelectedExpense(expense);
		setIsOpen(true);
	};

	// useEffect(() => {
	// 	fetchBudget();
	// 	fetchExpenses();
	// }, []);

	return (
		<div>
			{/* <AlertThresholdModal />
			<AlertExceededModal /> */}
			<DonutChart />
			<LastExpenses onExpenseClick={handleExpenseClick} />
			<ExpensesModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				selectedExpense={selectedExpense}
				setSelectedExpense={setSelectedExpense}
				selectedBudget={0}
			/>
		</div>
	);
}
