import { useState } from "react";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Methode Fetch pour l'envoi des données à la bdd
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		console.log("handleSubmit");

		try {
			const response = await fetch("https://", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error("Connexion impossible", error);
		}
	};

	return (
		<div>
			<div className="border-[#1971c2] border-2 rounded-3xl mx-4 my-8 py-2 bg-[#a5d8ff] ">
				<div className="flex flex-col items-center text-2xl font-semibold mb-16">
					<h1 className="justify-center">Formulaire</h1>
					<h1 className="justify-center">d'enregistrement</h1>
				</div>
				<div className="px-12">
					{/* Fomulaire d'enregistrement */}
					<form onSubmit={handleSubmit} className="space-y-6">
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
								className="w-72 input input-neutral"
							/>
						</div>

						{/* Champ Mot de passe d'utilisateur */}
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
