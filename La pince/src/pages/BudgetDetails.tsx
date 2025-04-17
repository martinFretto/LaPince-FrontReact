import { Link, NavLink, useLocation } from "react-router-dom";
import DonutDetail from "../components/DonughtDetails/index";
import DetailsExpenses from "../components/DetailsExpenses";
import { useState } from "react";

export default function BudgetDetails() {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const { budget }: { budget?: BudgetType } = location.state || {};

	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");

	if (!budget) {
		return <div>Budget non trouvé</div>;
	}

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

	return (
		<div>
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
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					className="flex flex-col items-center"
					onClick={() => setIsOpen(true)}
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
						className="w-10 absolute mt-20 "
					/>
					<DonutDetail budget={budget} />
					<div className="absolute bottom-4 right-4">
						<Link to="/dashboard">
							<img
								src="/logo-settings.svg"
								alt="logo-reglage"
								className="w-8 h-8"
							/>
						</Link>
					</div>
				</div>
				<div className="flex justify-center font-semibold text-2xl mt-4">
					<h2>Mes dépenses {budget.name}</h2>
				</div>
			</div>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="relative w-full max-w-lg mx-4 border-[#1971c2] border-2 rounded-xl p-6 bg-[#f8f9fa] overflow-hidden">
						{/* En-tête avec titre et bouton de fermeture */}
						<div className="relative mb-4">
							{/* Bouton de fermeture en position absolue */}
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={() => setIsOpen(false)}
								className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
							>
								✕
							</button>

							{/* Titre */}
							<h2 className="text-lg font-medium text-black text-center w-full">
								Ajout d'une dépense
								<br />
								{budget.name}
							</h2>
						</div>

						{/* Formulaire */}
						<div className="space-y-4">
							{/* Montant */}
							<div className="text-center">
								<label className="block mb-1 text-black" htmlFor="number">
									Montant
								</label>
								<div className="flex justify-center">
									<input
										id="number"
										type="number"
										value={amount}
										onChange={(e) => setAmount(e.target.value)}
										className="bg-white border border-gray-300 rounded p-2 text-center max-w-[80%]"
										placeholder="0.00 €"
									/>
								</div>
							</div>

							{/* Description */}
							<div className="text-center">
								<label className="block mb-1 text-black" htmlFor="description">
									Description
								</label>
								<div className="flex justify-center">
									<input
										id="description"
										type="text"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										className="bg-white border border-gray-300 rounded p-2 text-center max-w-[80%]"
									/>
								</div>
							</div>

							{/* Date */}
							<div className="text-center">
								<label className="block mb-1 text-black" htmlFor="date">
									Date
								</label>
								<div className="flex justify-center">
									<input
										id="date"
										type="date"
										value={date}
										onChange={(e) => setDate(e.target.value)}
										className="bg-white border border-gray-300 rounded p-2 text-center max-w-[80%]"
									/>
								</div>
							</div>
						</div>

						{/* Bouton Valider */}
						<div className="flex justify-center mt-6">
							<button
								type="button"
								onClick={() => setIsOpen(false)}
								className="btn bg-[#4dabf7] border-2 border-[#1971c2] text-white text-md font-normal hover:cursor-pointer flex place-self-center px-8 py-1 rounded"
							>
								Ajouter
							</button>
						</div>
					</div>
				</div>
			)}

			<div>
				<DetailsExpenses budget={budget.id} />
			</div>
		</div>
	);
}
