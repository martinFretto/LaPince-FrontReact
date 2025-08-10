import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function Header() {
	const navigate = useNavigate();
	const { isAuthenticated, logout } = useAuthStore();
	

	// Permet de modifier la couleur du lien clické
	const linkBaseClasses = "font-semibold";
	const activeClass = "text-[#1971C2]";
	const inactiveClass = "text-black";

	// Permet la suppression du token et de revenir à la page login
	const handleLogout = () => {
		console.log("logout!!!")
		logout();
	//	sessionStorage.removeItem("authToken");
		navigate("/auth/login");
	};

	// Vérifie si un token existe dans le sessionStorage
//	const isAuthenticated = sessionStorage.getItem("authToken");

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
								className="w-20 -mt-4.5 mr-10"
							/>
							{/*to="/dashboard"*/}
							<NavLink
								to={isAuthenticated? "/dashboard" : "/"}
								
								className={({ isActive }) =>
									`absolute -mt-5 ml-3 ${linkBaseClasses} ${isActive ? activeClass : inactiveClass}`
								}
							>
								Accueil
							</NavLink>
						</div>
					</div>

					<div className="flex -ml-12 place-self-center">

						{/* Affiche "Mon profil" uniquement si l'utilisateur est authentifié */}
						{isAuthenticated && (
							<NavLink
								to="/profile"
								className={({ isActive }) =>
									`pr-6 ${linkBaseClasses} ${isActive ? activeClass : inactiveClass}`
								}
							>
								Mon profil
							</NavLink>
						)}

						{/* Affiche "Mes budgets" uniquement si l'utilisateur est authentifié */}
						{isAuthenticated && (
							<NavLink
								to="/budgets"
								className={({ isActive }) =>
									`pr-6 ${linkBaseClasses} ${isActive ? activeClass : inactiveClass}`
								}
							>
								Mes budgets
							</NavLink>
						)}

						{/* Change le texte du bouton en fonction de l'authentification */}
						{/*	onClick={isAuthenticated ? logout : () => navigate("/auth/login")}*/}
						<button
							type="button"					
							onClick={isAuthenticated? () => handleLogout() : () => navigate("/auth/login")}
							className={`${linkBaseClasses} ${inactiveClass} cursor-pointer`}
						>
							{isAuthenticated ? "Se déconnecter" : "Se connecter"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
