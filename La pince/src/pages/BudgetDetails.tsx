import { NavLink, useLocation, useParams } from "react-router-dom";
import DoughnutDetails from "../components/DoughnutDetails/index";
import DetailsExpenses from "../components/DetailsExpenses";
import { useCallback, useEffect, useState } from "react";
import ExpensesModal from "../components/Modals/ExpensesModal";
import { fetchExpensesByBudget } from "../api/expenses";
import type { Expense, ExpenseWithDetails } from "../types/expense";
import { PageSpinner } from "../components/Spinner";

export default function BudgetDetails() {
	interface BudgetType {
		id: number;
		name: string;
		icon: string;
		amount: number;
		spent: number;
		warning_amount: number;
		spent_amount: number;
		allocated_amount: number;
		color: string;
		user_id: number;
		created_at: string;
		updated_at: string;
	}
	/****New ***/
	const { budgetId } = useParams<{ budgetId: string }>();

	const [isOpen, setIsOpen] = useState(false);
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
	const location = useLocation();
	const { budget }: { budget?: BudgetType } = location.state || {};
	const [isLoading, setIsLoading] = useState(true);

	const handleExpenseClick = (expense: Expense | null) => {
		setSelectedExpense(expense);
		setIsOpen(true);
	};

	const getExpenses = useCallback(async () => {
		try {
			const data = await fetchExpensesByBudget(Number(budgetId));
			if (Array.isArray(data.data)) {
				const expenses: Expense[] = data.data.map((item: ExpenseWithDetails) => ({
					...item.expenditure,
					budgetColor: item.budgetColor,
					budgetIcon: item.budgetIcon,
				}));
				setExpenses(expenses);
				setIsLoading(false);
			} else {
				throw Error;
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.log(err.message);
			} else {
				console.log("Une erreur est survenue lors de la récupération des budgets");
			}
			setIsLoading(false);
		}
	},[budgetId]);

	useEffect(() => {
		getExpenses();
	}, [getExpenses]);

	if (!budget) {
		return <div>Budget non trouvé</div>;
	}

	return (
	<div className="3xl:mx-80">
		{isLoading ? (
		<div className="min-h-screen flex items-center justify-center">
			<PageSpinner />
		</div>
		) : (
		<>
			<div className="flex justify-between mx-4 mt-4">
			<NavLink to={"/budgets"}>
				<div className="flex items-center">
				<img
					src="/logo-arrow-left.svg"
					alt="fleche gauche"
					className="w-5"
				/>
				<p className="font-semibold mb-1 pl-1 text-md">retour</p>
				</div>
			</NavLink>

			<div
				className="flex flex-col items-center hover:cursor-pointer"
				onClick={() => {
				setSelectedExpense(null);
				setIsOpen(true);
				}}
			>
				<img src="/logo-plus.svg" alt="logo plus" className="w-8" />
				<p className="text-[10px]">Ajouter</p>
				<p className="text-[10px]">dépenses</p>
			</div>
			</div>

			<div className="container mx-auto px-4 py-6">
			<div className="relative p-4 flex flex-col items-center w-full max-w-sm mx-auto min-h-60">
				<img
				src={budget.icon}
				alt={budget.name.slice(0, 4)+'...'}
				className="w-10 absolute mt-24"
				/>
				<DoughnutDetails expenses={expenses} budget={budget} />
			</div>

			{expenses.length > 0 ? (
			<div className="flex justify-center font-semibold text-2xl mt-4">
				<h2>Mes dépenses {budget.name}: </h2>
			</div>) : (<div className="font-bold block text-center">Aucune dépense effectuée</div>)}
			</div>

			{/* Modale dépenses */}
			<ExpensesModal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			selectedExpense={selectedExpense}
			setSelectedExpense={setSelectedExpense}
			selectedBudget={budget.id}
			refreshData={getExpenses}
		//	setIsLoading={setIsLoading}
			/>

			{expenses.length > 0 && (
			<DetailsExpenses
				expenses={expenses}
				onExpenseClick={handleExpenseClick}
			/>
			)}
		</>
		)}
	</div>
	);
}
