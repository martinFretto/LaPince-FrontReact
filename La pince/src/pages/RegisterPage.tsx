import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
	const navigate = useNavigate();
	const [lastname, setLastname] = useState("");
	const [firstname, setFirstname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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
		const userData = {
			lastname,
			firstname,
			email,
			password,
		};
		console.log(userData);
		await registerUser(userData);
		navigate("/auth/login");
	};

	return (
		<div className="place-self-center">
			<div className="border-[#1971c2] border-2 rounded-3xl mx-4 my-8 py-2 bg-[#a5d8ff] min-w-100 max-w-100 flex flex-col justify-center">
				<div className="flex flex-col items-center text-2xl font-semibold mb-16">
					<h1 className="justify-center">Formulaire</h1>
					<h1 className="justify-center">d'enregistrement</h1>
				</div>
				<div className="px-12">
					{/* Fomulaire d'enregistrement */}
					<form onSubmit={handleSubmit} className="space-y-6">
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
						<div>
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
							<div className="flex justify-center">
								<ul className="mt-2 text-sm">
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
						</div>

						<button
							type="submit"
							className="btn bg-[#4dabf7] border-2 border-[#1971c2] text-white text-md font-normal hover:cursor flex place-self-center mt-20 mb-4"
						>
							S'enregistrer
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
