import "../App.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import DonutDetail from "../components/DonughtDetails/index";
// import { budgets } from "../data/budget";
import { fetchBudget } from "../api/budget";
import { useEffect } from "react";
import BudgetModal from "../components/Modals/BudgetModal";
import type { Budget } from "../types/budget";
import Flag from "../components/flag";
import type { Expense } from "../types/Expense";
import { fetchExpenses } from "../api/expenses";

export default function Budgets() {
	const [budgets, setBudgets] = useState<Budget[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [expensesUpdatedTrigger] = useState<number>(0);
	const getBudgets = async () => {
		try {
			const data = await fetchBudget();
			if (Array.isArray(data.data)) {
				setBudgets(data.data);
			} else {
				console.warn("Données reçues non valides:", data);
			}
		} catch (error) {
			console.error("Erreur de chargement des budgets:", error);
		}
	};

	useEffect(() => {
		const getData = async () => {
			try {
				const budgetsData = await fetchBudget();
				if (Array.isArray(budgetsData.data)) {
					setBudgets(budgetsData.data);
				}

				const expensesData = await fetchExpenses();
				if (Array.isArray(expensesData)) {
					setExpenses(expensesData);
				}
			} catch (error) {
				console.error("Erreur lors du chargement des données :", error);
			}
		};

		getData();
	}, []);

	useEffect(() => {
		getBudgets();
	}, []);

	const totalBudget = budgets.reduce(
		(acc, budget) => acc + Number(budget.allocated_amount),
		0
	);

	// "series" correspond a l'affichage des parts du donut
	const series = budgets.map((budget) => budget.spent_amount);

	const spent = series.reduce(
		(acc, val) => acc + (Number.isNaN(Number(val)) ? 0 : Number(val)),
		0
	);

	// calcul du montant restant par budget
	const remaining = Math.round((totalBudget - spent) * 100) / 100;
	const remainingPercent = Math.round((remaining / totalBudget) * 100);

	const openModal = () => {
		setIsModalOpen(true);
	};

	// Methode pour modifier un budget
	const handleEditBudget = (budget: any) => {
		setSelectedBudget(budget);
		openModal();
	};

	// Methode pour Ajouter un budget
	const handleAddBudget = () => {
		setSelectedBudget(null);
		setIsModalOpen(true);
		// openModal();
	};

	return (
		<div>
			<div className="flex flex-col items-center w-full">
				{/* En-tête général */}
				<div className="container mx-auto px-4 py-6 w-full">
					<div
						className="flex justify-around align-middle gap-5 mx-auto w-full"
						style={{ maxWidth: "1200px" }}
					>
						<div className="justify-items-center">
							<p className="font-semibold text-xl">{remaining} €</p>
							<p className="font-semibold text-xl">restant</p>
						</div>
						<div className="flex flex-col">
							<div className="justify-items-center">
								<p className="font-semibold text-xl">{remainingPercent} %</p>
								<p className="text-[12px] -mt-1 mb-3">disponible</p>
							</div>
							<progress
								className="progress progress-success w-25 h-4 border-1 border-black custom-progress shadow-md shadow-gray-600"
								value={remainingPercent}
								max="100"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Vignettes des budgets */}
			<div className="container mx-auto px-4 py-6 w-full">
				<div
					className="grid gap-15 grid-cols-1 min-[791px]:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3 mx-auto"
					style={{ maxWidth: "1200px" }}
				>
					{/* Tri des budgets par ordre alphabétique */}
					{[...budgets] // on clone pour éviter de muter le state directement
						.sort((a, b) => a.name.localeCompare(b.name)) // tri alphabétique
						.map((budget) => {
							const remainingAmount =
								budget.allocated_amount - budget.spent_amount;

							let flagColor = null;
							let flagText = null;

							if (remainingAmount < 0) {
								flagColor = "bg-red-400";
								flagText = "Budget dépassé";
							} else if (remainingAmount < budget.warning_amount) {
								flagColor = "bg-amber-400";
								flagText = "Seuil d'alerte atteint";
							}

							return (
								<div
									key={budget.id}
									className="relative border border-gray-300 rounded-xl p-4 flex flex-col items-center w-full max-w-md min-w-[280px] mx-auto min-h-60 overflow-hidden"
								>
									<NavLink
										to={`${budget.id}`}
										state={{ budget }}
										className="w-full h-full flex flex-col items-center"
									>
										{flagColor && <Flag color={flagColor} text={flagText} />}

										<img
											src={budget.icon}
											alt="icone du budget"
											className="w-10 mb-4 absolute mt-24"
										/>
										<DonutDetail
											expenses={expenses}
											budget={budget}
											expensesUpdatedTrigger={expensesUpdatedTrigger}
										/>
									</NavLink>

									<div
										className="absolute bottom-4 right-4 hover:cursor-pointer"
										onClick={() => handleEditBudget(budget)}
									>
										<img
											src="/logo-settings.svg"
											alt="logo-reglage"
											className="w-8 h-8"
										/>
									</div>
								</div>
							);
						})}
				</div>
				<button
					type="button"
					className="btn bg-[#4DABF7] border-2 border-[#1971C2] text-white mx-auto flex justify-center mt-4"
					onClick={() => handleAddBudget()}
				>
					Ajouter un budget
				</button>

				{/* Modale d'ajout de budget */}

				<BudgetModal
					isModalOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					selectedBudget={selectedBudget}
					setSelectedBudget={setSelectedBudget}
					fetchBudget={getBudgets}
				/>
			</div>
		</div>
	);
}
