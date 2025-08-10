import { useState } from "react";
import { resetPasswordRequest } from "../api/auth";
//import { useNavigate } from "react-router-dom";

export default function ResetPasswordRequestFormPage() {
	const [email, setEmail] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		try {
			setSuccessMessage("");
			await resetPasswordRequest(email);
			setSuccessMessage("Un lien de réinitialisation a été envoyé !");
			setErrorMessage("");
		} catch (err: unknown) {
			if (err instanceof Error) {			
					setErrorMessage(err.message);
			} else {
					setErrorMessage("Une erreur est survenue");
			}
		}
	};

	return (
		<div className="place-self-center">
			<div className="border-[#1971c2] border-2 rounded-3xl mx-4 my-8 py-2 bg-[#a5d8ff] min-w-90 max-w-90 flex flex-col justify-center">
				<div className="flex flex-col items-center text-2xl font-semibold mb-16">
					<h1 className="justify-center">Formulaire de reinitialisation</h1>
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

						<button
							type="submit"
							className="btn bg-[#4dabf7] border-2 border-[#1971c2] text-white text-md font-normal hover:cursor flex place-self-center mt-10 mb-4 justify-center"
						>
							Envoyer
						</button>
						{successMessage && (
							<span className="text-green-500 text-md self-center">
								{successMessage}
							</span>
						)}
						{errorMessage && (
							<span className="text-red-500 text-md self-center">
								{errorMessage}
							</span>
						)}
					</form>

					{isOpen && (
						<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
							<div className="modal modal-open">
								<div className="modal-box">
									<h2 className="text-xl font-bold text-center">
										Un email vous a été envoyé
									</h2>
									<h2 className="text-xl font-bold text-center">
										(ou pas, le systeme n'est pas encore mis en place)
									</h2>
									<div className="flex justify-center mt-4">
										<button
											type="button"
											className="btn btn-info"
											onClick={() => setIsOpen(false)}
										>
											Confirmer
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
