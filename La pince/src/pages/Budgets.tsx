import { NavLink } from "react-router-dom";
import "../App.css";
import DonutDetail from "../components/DonughtDetails/index";
import { budgets } from "../data/budget";
import { useState } from "react";

export default function Budgets() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div>
			{/* En-tête général */}
			<div className="flex justify-around align-middle my-6 xl:mx-60 2xl:mx-150 ">
				<div className="justify-items-center">
					<p className="font-semibold text-xl">7777,77 €</p>
					<p className="font-semibold text-xl">restant</p>
				</div>
				<div className="flex flex-col">
					<div className="justify-items-center">
						<p className="font-semibold text-xl">90 %</p>
						<p className="text-[12px] -mt-1 mb-3">disponible</p>
					</div>
					<progress
						className="progress progress-success w-25 h-4 border-1 border-black custom-progress shadow-md shadow-gray-600"
						value="70"
						max="100"
					/>
				</div>
			</div>

			{/* Vignettes des budgets */}
			<div className="container mx-auto px-4 py-6">
				<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:mx-40 2xl:mx-80">
					{budgets.map((budget) => (
						<div
							key={budget.id}
							className="relative border border-gray-300 rounded-xl p-4 flex flex-col items-center w-full max-w-sm mx-auto min-h-60"
						>
							<NavLink
								to={`${budget.name}`}
								state={{ budget }}
								className="w-full h-full flex flex-col items-center"
							>
								<img
									src={budget.icon}
									alt="icone du budget"
									className="w-10 mb-4"
								/>
								<DonutDetail budget={budget} />
							</NavLink>

							<div className="absolute bottom-4 right-4">
								<NavLink to="/dashboard">
									<img
										src="/logo-settings.svg"
										alt="logo-reglage"
										className="w-8 h-8"
									/>
								</NavLink>
							</div>
						</div>
					))}
				</div>
				<button
					type="button"
					className="btn bg-[#4DABF7] border-2 border-[#1971C2] text-white mx-auto flex justify-center mt-4"
					onClick={() => setIsOpen(true)}
				>
					Ajouter un budget
				</button>
				{/* Modal d'ajout de budget */}
				{isOpen && (
					<div
						className="fixed inset-0  flex items-center justify-center z-2 "
						onClick={() => setIsOpen(false)} // Ferme la modal quand tu cliques sur le fond
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") setIsOpen(false); // Ferme avec "Enter" ou "Espace"
						}}
						aria-label="Fermer la modal"
					>
						{/* Contenu de la modal */}
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div
							className="bg-gray-200  shadow-2xl shadow-gray-700 w-4/5 sm:w-3/4 lg:w-2/3 xl:w-4/7 2xl:w-2/7 p-1 border-black border-2"
							onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique sur l'image
						>
							<h1>Titre</h1>
							<p>label</p>
							<p>champ</p>
							<p>label</p>
							<p>champ</p>
							<button
								type="button"
								className="btn bg-[#4DABF7] border-2 border-[#1971C2] rounded-xl text-white mx-auto flex justify-center mt-4"
							>
								Valider
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
