import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
	const navigate = useNavigate();
	const [lastname, setLastname] = useState("");
	const [firstname, setFirstname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [isSamePass, setIsSamePass] = useState(false);
	const [, setIsEmailAlreadyExist] = useState(false);
	const [isInvalidPassword, setIsInvalidPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState(""); // Ajouter un état pour l'erreur

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

		// Vérification des conditions du mot de passe
		if (!hasMinLength || !hasUpperCase || !hasNumber) {
			setIsInvalidPassword(true);
			// Return si les mots de passe ne respecte pas les conditions
			return;
		}
		setIsInvalidPassword(false);

		// Vérification si les mots de passe sont identiques
		if (password !== passwordConfirm) {
			setIsSamePass(true);
			// Return si les mots de passe ne correspondent pas
			return;
		}

		const userData = {
			lastname,
			firstname,
			email,
			password,
		};

		try {
			// Appeler la méthode pour enregistrer l'utilisateur
			await registerUser(userData);
			navigate("/auth/login");
		} catch (err: any) {
			console.error("Erreur lors de l'enregistrement :", err);

			// Vérification de la réponse dans l'erreur
			if (err.response) {
				const statusCode = err.response.status;
				console.log("Status Code:", statusCode); // Loguer le code d'erreur

				// Gestion du message en fonction du code d'erreur
				if (statusCode === 409) {
					setErrorMessage("Cet email existe déjà.");
					setIsEmailAlreadyExist(true);
				} else if (statusCode === 400) {
					setErrorMessage("Le format de l'email est invalide.");
				} else {
					setErrorMessage("Une erreur inconnue est survenue.");
				}
			} else {
				setErrorMessage("Une erreur est survenue, veuillez réessayer.");
			}
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
								value={lastname}
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
								value={firstname}
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
							<div className="flex items-center">
								<label htmlFor="password" className="w-32 text-right pr-4">
									Mot de passe
								</label>
								<input
									type="password"
									id="password"
									placeholder="********"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="w-72 input input-neutral"
								/>
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
							<div className="flex items-center mt-8">
								<label
									htmlFor="passwordConfirm"
									className="w-32 text-right pr-4"
								>
									Confirmation
								</label>
								<input
									type="password"
									id="passwordConfirm"
									placeholder="********"
									value={passwordConfirm}
									onChange={(e) => setPasswordConfirm(e.target.value)}
									required
									className="w-72 input input-neutral"
								/>
							</div>
							{isSamePass && (
								<span className="text-red-500 text-md self-center">
									Les mots de passe ne sont pas identiques
								</span>
							)}

							{/* Affichage du message d'erreur si le mot de passe est invalide */}
							{isInvalidPassword && (
								<span className="text-red-500 text-md self-center">
									Le mot de passe doit comporter au moins 8 caractères, une
									majuscule et un chiffre.
								</span>
							)}

							{/* Affichage du message d'erreur généré par l'API */}
							{errorMessage && (
								<span className="text-red-500 text-md self-center">
									{errorMessage}
								</span>
							)}
						</div>

						<button
							type="submit"
							className="btn bg-[#4dabf7] border-2 border-[#1971c2] text-white text-md font-normal hover:cursor flex place-self-center mt-12 mb-4"
						>
							S'enregistrer
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
