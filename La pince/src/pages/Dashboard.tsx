import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoughnutChart from "../components/DoughnutChart";
import LastExpenses from "../components/LastExpenses";
import { Expense, ExpenseWithDetails } from "../types/expense";
import ExpensesModal from "../components/Modals/ExpensesModal";
import { fetchBudgets } from "../api/budget";
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

	/****NEW*** */
	const getData = useCallback(async() => {
		try {
			setIsLoading(true);
			 // Simuler un délai de 2 secondes pour voir le spinner
    	//	await new Promise(res => setTimeout(res, 3000));
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
				if(bData.length===0){
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
		console.log("DASHBOARD premier use effect ")
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
			<LastExpenses expenses={expenses} onExpenseClick={handleExpenseClick} />
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
