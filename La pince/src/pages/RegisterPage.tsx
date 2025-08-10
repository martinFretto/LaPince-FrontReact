import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Spinner } from "../components/Spinner";

export default function RegisterPage() {
	const navigate = useNavigate();
	const [last_name, setLastname] = useState("");
	const [first_name, setFirstname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [isSamePass, setIsSamePass] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");  
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Conditions de validation du mot de passe
	const hasUpperCase = /[A-Z]/.test(password);
	const hasNumber = /\d/.test(password);
	const hasMinLength = password.length >= 8;

	// Fonction pour afficher ✔ ou ✘ avec couleur
	const icon = (isValid: boolean) => (
		<span className={isValid ? "!text-green-600 pr-2" : "text-red-600 pr-2"}>
			{isValid ? "✔" : "✘"}
		</span>
	);

	// Methode Fetch pour l'envoi des données à la bdd
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		
		if (password !== passwordConfirm) {
			setIsSamePass(false);
			return;
		} 
		setIsSamePass(true);

		const userData = {
			last_name,
			first_name,
			email,
			password,
		};

		
		try {
			setIsLoading(true);
			// Appeler la méthode pour enregistrer l'utilisateur
			console.log("ptite requête api")
			await registerUser(userData);

			setErrorMessage("");
			setSuccessMessage("Compte créé avec succès vous allez être redirigé vers la page de connexion !");
			setIsLoading(false);
			// Délai de 2 secondes avant la redirection
			setTimeout(() => {
				navigate("/auth/login");
			}, 2000);
		} catch (err: unknown) {
			if (err instanceof Error) {
					console.log("bam erreur")
					setErrorMessage(err.message);
			} else {
					setErrorMessage("Une erreur est survenue");
			}
			setIsLoading(false);
		}
	};

	return (
		<div className="place-self-center">
			<div className="border-[#1971c2] border-2 rounded-3xl mx-4 my-8 py-2 bg-[#a5d8ff] min-w-100 max-w-100 flex flex-col justify-center">
				<div className="flex flex-col items-center text-2xl font-semibold mb-16">
					<h1 className="justify-center">Formulaire</h1>
					<h1 className="justify-center">d'enregistrement</h1>
				</div>
				<div className="px-6">
					{/* Formulaire d'enregistrement */}
					<form onSubmit={handleSubmit} className="space-y-6 ">
						{/* Champ Nom d'utilisateur */}
						<div className="flex items-center">
							<label htmlFor="lastname" className="w-32 text-right pr-4">
								Nom
							</label>
							<input
								type="text"
								id="lastname"
								placeholder="Nom"
								value={last_name}
								onChange={(e) => setLastname(e.target.value)}
								required
								className="w-72 input validator input-neutral"
							/>
						</div>

						{/* Champ Prénom d'utilisateur */}
						<div className="flex items-center">
							<label htmlFor="firstname" className="w-32 text-right pr-4">
								Prénom
							</label>
							<input
								type="text"
								id="firstname"
								placeholder="Prénom"
								value={first_name}
								onChange={(e) => setFirstname(e.target.value)}
								required
								className="w-72 input validator input-neutral"
							/>
						</div>

						{/* Champ Email d'utilisateur */}
						<div className="flex items-center">
							<label htmlFor="email" className="w-32 text-right pr-4">
								Email
							</label>
							<input
								type="email"
								id="email"
								placeholder="crabesurlecoeur@lapince.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-72 input validator input-neutral"
							/>
						</div>

						{/* Champ Mot de passe d'utilisateur */}
						<div className="flex flex-col">
							<div className="flex items-center relative">
								<label htmlFor="password" className="w-32 text-right pr-4">
									Mot de passe
								</label>
								<input
									type={showPassword ? "text" : "password"}
									id="password"
									placeholder="********"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="w-72 input input-neutral"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 text-gray-600 hover:text-black z-20"
								>
									{showPassword ? (
									<EyeSlashIcon className="h-5 w-5" />
									) : (
									<EyeIcon className="h-5 w-5" />
									)}
								</button>
							</div>
							{/* Liste des conditions */}
							<div className="flex justify-center -mt-2">
								<ul className="mt-2 text-sm ml-8">
									<li className="flex items-center">
										{icon(hasMinLength)} Minimum 8 caractères
									</li>
									<li className="flex items-center">
										{icon(hasUpperCase)} Une majuscule
									</li>
									<li className="flex items-center">
										{icon(hasNumber)} Un chiffre
									</li>
								</ul>
							</div>

							{/* Champ confirmation du Mot de passe d'utilisateur */}
							<div className="flex items-center mt-8 relative">
								<label
									htmlFor="passwordConfirm"
									className="w-32 text-right pr-4"
								>
									Confirmation
								</label>
								<input
									type={showPasswordConfirm ? "text" : "password"}
									id="passwordConfirm"
									placeholder="********"
									value={passwordConfirm}
									onChange={(e) => setPasswordConfirm(e.target.value)}
									required
									className="w-72 input input-neutral"
								/>
								<button
									type="button"
									onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
									className="absolute right-3 text-gray-600 hover:text-black z-20"
								>
									{showPasswordConfirm ? (
									<EyeSlashIcon className="h-5 w-5" />
									) : (
									<EyeIcon className="h-5 w-5" />
									)}
								</button>
							</div>
						</div>

						<div className="flex justify-center">
							<button
							type="submit"
							className="btn px-6 py-2 bg-[#4dabf7] border-2 border-[#1971c2] text-white text-md font-normal hover:cursor flex items-center justify-center"
							>
							{isLoading ? <Spinner /> : "S'enregistrer"}
							</button>
						</div>

						{!isSamePass && (
								<span className="text-red-500 text-md self-center">
									Les mots de passe ne sont pas identiques.
								</span>
						)}


						{/* Affichage du message d'erreur généré par l'API */}
						{errorMessage && (
							<span className="text-red-500 text-md self-center">
								{errorMessage}
							</span>
						)}

						{successMessage && (
							<span className="text-green-500 text-md self-center">
								{successMessage}
							</span>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}