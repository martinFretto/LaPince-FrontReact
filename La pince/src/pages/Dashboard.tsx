import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoughnutChart from "../components/DoughnutChart";
import LastExpenses from "../components/LastExpenses";
import { Expense } from "../types/expense";
import ExpensesModal from "../components/Modals/ExpensesModal";
import { fetchBudgets } from "../api/budget";
import type { Budget } from "../types/budget";

export default function Dashboard() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
	const [budgets, setBudgets] = useState<Budget[]>([]);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	const handleExpenseClick = (expense: Expense) => {
		console.log("oléolé")
		setSelectedExpense(expense);
		setIsOpen(true);
	};

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await fetchBudgets();
				if (Array.isArray(data.data)) {
					setBudgets(data.data);
				} else {
					console.log("Données reçues non valides:", data);
				}
			} catch (err) {
				if (err instanceof Error) {
					console.log(err.message);
				} else {
					console.log("Une erreur est survenue lors de la récupération des budgets");
				}
			} finally {
				setIsLoading(false);
			}								
		};
		getData();
	}, []);			

	useEffect(() => {
		if (!isLoading && (!budgets || budgets.length === 0)) {
			navigate("/budgets");		}
	}, [isLoading, budgets, navigate]);

	return (
		<div className="sm:mx-10 3xl:mx-90 4xl:mx-120">  
			<DoughnutChart budgets={budgets} />
			<LastExpenses onExpenseClick={handleExpenseClick} />
	{		<ExpensesModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				selectedExpense={selectedExpense}
				setSelectedExpense={setSelectedExpense}
				selectedBudget={0}
				fetchExpenses={() => {}}
				triggerReload={() => {}}
			/>  }
		</div>
	);
}
