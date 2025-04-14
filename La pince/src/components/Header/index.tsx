import { NavLink } from "react-router-dom";

// Permet de modifier la couleur du lien clické
const linkBaseClasses = "font-semibold";
const activeClass = "text-[#1971C2]";
const inactiveClass = "text-black";

export default function Header() {
	return (
		<div>
			<div className="relative bg-[#99E9F2] flex justify-around">
				<div className="grid grid-cols-2">
					<div>
						<h1 className="rotate-350 mb-2 font-bold text-lg">La Pince</h1>
						<div className="ml-0.5 pb-2">
							<img
								src="/logo-crab.svg"
								alt="Logo La pince"
								className="w-20 -mt-4.5"
							/>
							<NavLink
								to="/dashboard"
								className={(
									{ isActive }, // Si le lien Accueil est clické, le isActive devient actif et applique activeClass et sa couleur défini plus haut
								) =>
									`absolute -mt-5 ml-3 ${linkBaseClasses} ${
										isActive ? activeClass : inactiveClass
									}`
								}
							>
								Accueil
							</NavLink>
						</div>
					</div>

					<div className="flex -ml-12 place-self-center">
						<NavLink
							to="/budgets"
							className={({ isActive }) =>
								`pr-6 ${linkBaseClasses} ${
									isActive ? activeClass : inactiveClass
								}`
							}
						>
							Mes budgets
						</NavLink>

						<NavLink
							to="/disconnect"
							className={({ isActive }) =>
								`${linkBaseClasses} ${isActive ? activeClass : inactiveClass}`
							}
						>
							Se déconnecter
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}
