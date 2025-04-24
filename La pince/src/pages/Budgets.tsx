import "../App.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import DonutDetail from "../components/DonughtDetails/index";
import BudgetModal from "../components/Modals/BudgetModal";
import { budgets } from "../data/budget";

export default function Budgets() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBudget, setSelectedBudget] = useState(null);

	const totalBudget = budgets.reduce(
		(acc, budget) => acc + budget.allocated_amount,
		0
	);

	const series = budgets.map((budget) => budget.spent_amount);
	const spent = series.reduce((acc, val) => acc + val, 0);
	// calcul du montant restant par budget
	const remaining = Math.round((totalBudget - spent) * 100) / 100;

	const remainingPercent = Math.round((remaining / totalBudget) * 100);
	console.log(remainingPercent);

	const openModal = () => {
		setIsModalOpen(true);
	};

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleEditBudget = (budget: any) => {
		setSelectedBudget(budget);
		openModal();
	};

	const handleAddBudget = () => {
		setSelectedBudget(null); // 👈 vider le budget sélectionné en premier
		setIsModalOpen(true);
		openModal();
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
					{budgets.map((budget) => (
						<div
							key={budget.id}
							className="relative border border-gray-300 rounded-xl p-4 flex flex-col items-center w-full max-w-md min-w-[280px] mx-auto min-h-60 overflow-hidden"
						>
							<NavLink
								to={`${budget.id}`}
								state={{ budget }}
								className="w-full h-full flex flex-col items-center"
							>
								<img
									src={budget.icon}
									alt="icone du budget"
									className="w-10 mb-4 absolute mt-22"
								/>
								<DonutDetail budget={budget} />
							</NavLink>

							{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
							<div
								className="absolute bottom-4 right-4"
								onClick={() => handleEditBudget(budget)}
							>
								<img
									src="/logo-settings.svg"
									alt="logo-reglage"
									className="w-8 h-8"
								/>
							</div>
						</div>
					))}
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
				/>
			</div>
		</div>
	);
}
