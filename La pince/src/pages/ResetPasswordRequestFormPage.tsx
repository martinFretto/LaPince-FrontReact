import { useState } from "react";
import { resetPasswordRequest } from "../api/auth";
import { ButtonSpinner} from "../components/Spinner";

export default function ResetPasswordRequestFormPage() {
	const [email, setEmail] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		try {
			setSuccessMessage("");
			setIsLoading(true);
			await resetPasswordRequest(email);
			setIsLoading(false);
			setSuccessMessage("Un lien de réinitialisation a été envoyé !");
			setErrorMessage("");
		} catch (err: unknown) {
			if (err instanceof Error) {			
					setErrorMessage(err.message);
			} else {
					setErrorMessage("Une erreur est survenue");
			}
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="border-[#1971c2] border-2 rounded-3xl mx-4 my-8 py-2 bg-[#a5d8ff] min-w-90 max-w-90 flex flex-col justify-center">
				<div className="flex flex-col items-center text-2xl font-semibold mb-16">
					<h1 className="justify-center">Formulaire de réinitialisation</h1>
					<h1 className="justify-center">du mot de passe</h1>
				</div>
				<div className="px-10">
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
								className="w-72 input validator input-neutral"
							/>
						</div>

						<div className="flex justify-center">
							<button
							type="submit"
							className="btn px-6 py-2 bg-[#4dabf7] border-2 border-[#1971c2] text-white text-md font-normal hover:cursor flex items-center justify-center"
							>
							{isLoading ? <ButtonSpinner /> : "Envoyer"}
							</button>
						</div>
						{successMessage && (
							<span className="text-green-500 text-md font-bold self-center">
								{successMessage}
							</span>
						)}
						{errorMessage && (
							<span className="text-red-500 text-md font-bold self-center">
								{errorMessage}
							</span>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
