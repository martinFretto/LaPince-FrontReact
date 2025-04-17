import { NavLink } from "react-router-dom";
import "../App.css";
import DonutDetail from "../components/DonughtDetails/index";
import { budgets } from "../data/budget";
import { useState } from "react";
import BudgetModal from "../components/Modals/AddedBudget";

export default function Budgets() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const totalBudget = budgets.reduce(
		(acc, budget) => acc + budget.allocated_amount,
		0
	);

	const series = budgets.map((budget) => budget.spent_amount);
	const spent = series.reduce((acc, val) => acc + val, 0);
	// calcul du montant restant par budget
	const remaining = Math.round((totalBudget - spent) * 100) / 100;

	const remainingPercent = Math.round(
		(remaining / totalBudget) * 100
	);
	console.log(remainingPercent);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			{/* En-tête général */}
			<div className='flex justify-around align-middle my-6 xl:mx-60 2xl:mx-150 '>
				<div className='justify-items-center'>
					<p className='font-semibold text-xl'>{remaining} €</p>
					<p className='font-semibold text-xl'>restant</p>
				</div>
				<div className='flex flex-col'>
					<div className='justify-items-center'>
						<p className='font-semibold text-xl'>
							{remainingPercent} %
						</p>
						<p className='text-[12px] -mt-1 mb-3'>disponible</p>
					</div>
					<progress
						className='progress progress-success w-25 h-4 border-1 border-black custom-progress shadow-md shadow-gray-600'
						value={remainingPercent}
						max='100'
					/>
				</div>
			</div>

			{/* Vignettes des budgets */}
			<div className='container mx-auto px-4 py-6'>
				<div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:mx-40 2xl:mx-80'>
					{budgets.map((budget) => (
						<div
							key={budget.id}
							className='relative border border-gray-300 rounded-xl p-4 flex flex-col items-center w-full max-w-sm mx-auto min-h-60'
						>
							<NavLink
								to={`${budget.id}`}
								state={{ budget }}
								className='w-full h-full flex flex-col items-center'
							>
								<img
									src={budget.icon}
									alt='icone du budget'
									className='w-10 mb-4 absolute mt-22'
								/>
								<DonutDetail budget={budget} />
							</NavLink>

							<div className='absolute bottom-4 right-4'>
								<NavLink to='/dashboard'>
									<img
										src='/logo-settings.svg'
										alt='logo-reglage'
										className='w-8 h-8'
									/>
								</NavLink>
							</div>
						</div>
					))}
				</div>
				<button
					type='button'
					className='btn bg-[#4DABF7] border-2 border-[#1971C2] text-white mx-auto flex justify-center mt-4'
					onClick={openModal}
				>
					Ajouter un budget
				</button>

				{/* Modale d'ajout de budget */}
				<BudgetModal isOpen={isModalOpen} onClose={closeModal} />
			</div>
		</div>
	);
}
