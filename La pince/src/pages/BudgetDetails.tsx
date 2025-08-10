import { NavLink, useLocation, useParams } from "react-router-dom";
import DonutDetail from "../components/DonughtDetails/index";
import DetailsExpenses from "../components/DetailsExpenses";
import { useEffect, useState } from "react";
import ExpensesModal from "../components/Modals/ExpensesModal";
import BudgetModal from "../components/Modals/BudgetModal";
import type { Budget } from "../types/budget";
import { fetchExpensesByBudget } from "../api/expenses";
import type { Expense, ExpenseWithDetails } from "../types/expense";

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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [selectedExpense, setSelectedExpense] = useState(null);
	const location = useLocation();
	const { budget }: { budget?: BudgetType } = location.state || {};
	const [expensesUpdatedTrigger, setExpensesUpdatedTrigger] = useState(0);

	const triggerExpensesReload = () => {
		setExpensesUpdatedTrigger((prev) => prev + 1);
	};
	const handleExpenseClick = (expense: any) => {
		setSelectedExpense(expense);
		setIsOpen(true);
	};

	const getExpenses = async () => {
		try {
			console.log("on lance le fetch bi budget")
			const data = await fetchExpensesByBudget(Number(budgetId));
			if (Array.isArray(data.data)) {
				console.log("données trouvées pr les dépenses de ce budget: ", data.data)

				const expenses: Expense[] = data.data.map((item: ExpenseWithDetails) => ({
										...item.expenditure,
										budgetColor: item.budgetColor,
										budgetIcon: item.budgetIcon,
									}));
				setExpenses(expenses);
			} else {
				console.log("Données reçues non valides:", data);
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.log(err.message);
			} else {
				console.log("Une erreur est survenue lors de la récupération des budgets");
			}
		}
	};

	useEffect(() => {
		console.log("budgetid vaut: ", budgetId);

		getExpenses();
	}, []);

	if (!budget) {
		return <div>Budget non trouvé</div>;
	}
	return (
		<div className="3xl:mx-80">
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
						alt="icone du budget"
						className="w-10 absolute mt-24 "
					/>
					<DonutDetail
						expenses={expenses}
						budget={budget}
						expensesUpdatedTrigger={expensesUpdatedTrigger}
					/>

					{/* <div
						className="absolute bottom-4 right-4"
						onClick={() => handleEditBudget(budget)}
					>
						<img
							src="/logo-settings.svg"
							alt="logo-reglage"
							className="w-8 h-8"
						/>
					</div> */}
				</div>
				<div className="flex justify-center font-semibold text-2xl mt-4">
					<h2>Mes dépenses {budget.name}</h2>
				</div>
			</div>

			{/* Modale dépenses */}
			<ExpensesModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				selectedExpense={selectedExpense}
				setSelectedExpense={setSelectedExpense}
				selectedBudget={budget.id}
				fetchExpenses={getExpenses}
				triggerReload={triggerExpensesReload}
			/>

			{expenses.length > 0 && (
				<DetailsExpenses
				expenses={expenses}
				onExpenseClick={handleExpenseClick}
				/>
			)}

		{/*}	<DetailsExpenses
				budget={budget.id}
				expenses={expenses}
				onExpenseClick={handleExpenseClick}
			/>*/}

			{/* Modale de modification de budget */}
			<BudgetModal
				isModalOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				selectedBudget={selectedBudget}
				setSelectedBudget={setSelectedBudget}
				fetchBudgets={(): void | Promise<void> => {
					throw new Error("Function not implemented.");
				}}
			/>
		</div>
	);
}
