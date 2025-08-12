import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoughnutChart from "../components/DoughnutChart";
import LastExpenses from "../components/LastExpenses";
import { Expense, ExpenseWithDetails } from "../types/expense";
import ExpensesModal from "../components/Modals/ExpensesModal";
import { fetchBudgets } from "../api/budgets";
import type { Budget } from "../types/budget";
import { fetchExpenses } from "../api/expenses";
import { PageSpinner } from "../components/Spinner";
//import { Spinner } from "../components/Spinner";

export default function Dashboard() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [budgets, setBudgets] = useState<Budget[]>([]);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	const handleExpenseClick = (expense: Expense) => {
		setSelectedExpense(expense);
		setIsOpen(true);
	};
	
	const getData = useCallback(async() => {
		try {
			setIsLoading(true);
			const eData = await fetchExpenses();
			if (Array.isArray(eData.data)) {
				const expenses: Expense[] = eData.data.map((item: ExpenseWithDetails) => ({
						...item.expenditure,
						budgetColor: item.budgetColor,
						budgetIcon: item.budgetIcon,
				}));
				setExpenses(expenses);
			} else {
				throw Error;
			}
			const bData = await fetchBudgets();
			if (Array.isArray(bData.data)) {
				setBudgets(bData.data);
				if(bData.data.length===0){
					navigate("/budgets");
				}
			} else {
				throw Error;
			}
			setIsLoading(false);
		} catch (err: unknown){
			if (err instanceof Error) {
				console.log(err.message);
			} else {
				console.log("Une erreur est survenue lors de la récupération des budgets");
			}
			setIsLoading(false);
			navigate("/budgets");
		}
	}, [navigate]);

	useEffect(() => {
		setIsLoading(true);
		getData();
	}, [getData]);

	return (
		<div className="sm:mx-10 3xl:mx-90 4xl:mx-120">
		{isLoading ? (
			<div className="min-h-screen flex items-center justify-center">
        		<PageSpinner />
      		</div>
		) : (
			<>
			<DoughnutChart budgets={budgets} />
			{expenses.length > 0 ? 
			(<LastExpenses expenses={expenses} onExpenseClick={handleExpenseClick} />) :
			(<div className="font-bold block text-center">Aucune dépense effectuée</div>)}
			
			<ExpensesModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				selectedExpense={selectedExpense}
				setSelectedExpense={setSelectedExpense}
				selectedBudget={0}
				refreshData={getData}
				setIsLoading={setIsLoading}
			/>
			</>
		)}
		</div>
	);
}
