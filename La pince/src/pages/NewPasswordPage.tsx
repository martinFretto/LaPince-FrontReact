import { useEffect, useState } from "react";
import { setNewPassword } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function NewPasswordPage() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [isSamePass, setIsSamePass] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState(""); 
    
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

    // Appel de ResetPassword pour faire l'appel fetch a l'API
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
			setIsSamePass(false);
			return;
		} 
        setIsSamePass(true);        
                
        try {
            const token = new URLSearchParams(location.search).get("token");

            // Appeler la méthode pour enregistrer l'utilisateur
            await setNewPassword(password, token);
        
            setErrorMessage("");
            setIsSamePass(true);
            setSuccessMessage("Mot de passe créé avec succès vous allez être redirigé vers la page de connexion !");
        
            // Délai de 3 secondes avant la redirection
            setTimeout(() => {
                navigate("/auth/login");
             }, 3000);
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
                    <h1 className="justify-center">Configuration</h1>
                    <h1 className="justify-center">du nouveu mot de passe</h1>
                </div>
                <div className="px-10">
                    {/* Fomulaire d'enregistrement */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Champ Mot de passe d'utilisateur */}
						<div className="flex flex-col">
							<div className="flex items-center">
								<label htmlFor="password" className="w-32 text-right pr-4">
									Nouveau mot de passe
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
                </div>
            </div>
        </div>
    );
}