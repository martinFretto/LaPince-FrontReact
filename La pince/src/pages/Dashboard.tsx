import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DonutChart from "../components/Donught";
import LastExpenses from "../components/LastExpenses";
import ExpensesModal from "../components/Modals/ExpensesModal";
import { fetchBudget } from "../api/budget";
import type { Budget } from "../types/budget";

export default function Dashboard() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedExpense, setSelectedExpense] = useState(null);
	const [budgets, setBudgets] = useState<{ data: Budget[] } | null>(null);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	const handleExpenseClick = (expense: any) => {
		setSelectedExpense(expense);
		setIsOpen(true);
	};

	useEffect(() => {
		const getData = async () => {
			try {
				const budgetsData = await fetchBudget();
				if (Array.isArray(budgetsData.data)) {
					setBudgets(budgetsData);
				}
			} catch (error) {
				console.error("Erreur lors du chargement des données :", error);
			} finally {
				setIsLoading(false);
			}
		};

		getData();
	}, []);

	useEffect(() => {
		if (!isLoading && (!budgets || budgets.data.length === 0)) {
			navigate("/budgets");
		}
	}, [isLoading, budgets, navigate]);

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
