import { useState, useEffect } from "react";
import { ButtonSpinner, PageSpinner } from "../components/Spinner";
import { getUserProfile, updateUserProfile } from "../api/users";
import { UpdatedUser, User } from "../types/user";
import { useAuthStore } from "../store/authStore";

export default function ProfilePage() {
    const { setUserBudget } = useAuthStore();
    const [user, setUser] = useState<User|null>(null);
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [totalBudget, setTotalBudget] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

  // Récupération des infos utilisateur au montage
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const res = await getUserProfile(); 

        if (res.data) {
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setTotalBudget(res.data.total_budget);
            setUser(res.data); // ici on prend directement l'objet
        } else {
            throw Error;
        }


        setIsLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
			setErrorMessage(err.message);
		} else {
			setErrorMessage("Impossible de charger le profil.");
		}
        
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Sauvegarde des modifications
  const handleSave = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      setIsLoading(true);
      const updatedUser: UpdatedUser = {
        first_name: firstName,
        last_name: lastName,
        total_budget: totalBudget
      }
      await updateUserProfile(updatedUser);

      setUserBudget(totalBudget);
      setSuccessMessage("Profil mis à jour avec succès !");
      setIsEditing(false);
      setIsLoading(false);
    } catch (err: unknown) {
        if (err instanceof Error) {
			setErrorMessage(err.message);
		} else {
			setErrorMessage("Erreur lors de la mise à jour du profil.");
		} 
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="border-[#1971c2] border-2 rounded-3xl mx-4 my-8 py-6 px-6 bg-[#a5d8ff] min-w-100 max-w-100 flex flex-col justify-center">
        <h1 className="text-2xl font-semibold text-center mb-8">
          Mon profil
        </h1>

        {(isLoading && !isEditing) || !user ? (
          <div className="min-h-screen flex items-center justify-center">
            <PageSpinner />
        </div>
        ) : (
          <form 
          onSubmit={(e) => {e.preventDefault()}}
          className="space-y-6">
            {/* Email (lecture seule) */}
            <div className="flex items-center">
              <label htmlFor="email" className="w-32 text-right pr-4">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user.email}
                disabled
                className="w-72 input input-neutral bg-gray-200 cursor-not-allowed"
              />
            </div>

            {/* Nom */}
            <div className="flex items-center">
              <label htmlFor="lastname" className="w-32 text-right pr-4">
                Nom
              </label>
              <input
                type="text"
                id="lastname"
                value={lastName}
                disabled={!isEditing}
                onChange={(e) => setLastName(e.target.value)}
                className={`w-72 input input-neutral ${
                  !isEditing && "bg-gray-200 cursor-not-allowed"
                }`}
              />
            </div>

            {/* Prénom */}
            <div className="flex items-center">
              <label htmlFor="firstname" className="w-32 text-right pr-4">
                Prénom
              </label>
              <input
                type="text"
                id="firstname"
                value={firstName}
                disabled={!isEditing}
                onChange={(e) => setFirstName(e.target.value)}
                className={`w-72 input input-neutral ${
                  !isEditing && "bg-gray-200 cursor-not-allowed"
                }`}
              />
            </div>

            {/* Budget total */}
            <div className="flex items-center">
              <label htmlFor="total_budget" className="w-32 text-right pr-4">
                Budget total
              </label>
              <input
                type="number"
                id="total_budget"
                min="0"
                value={totalBudget}
                disabled={!isEditing}
                onChange={(e) => setTotalBudget(parseFloat(e.target.value))}
                className={`w-72 input input-neutral ${
                  !isEditing && "bg-gray-200 cursor-not-allowed"
                }`}
              />
            </div>

            {/* Dépenses totales (lecture seule) */}
            <div className="flex items-center">
              <label htmlFor="total_expenses" className="w-32 text-right pr-4">
                Dépenses totales
              </label>
              <input
                type="number"
                id="total_expenses"
                value={user.total_expenses}
                disabled
                className="w-72 input input-neutral bg-gray-200 cursor-not-allowed"
              />
            </div>

            {/* Boutons */}
            <div className="flex justify-center space-x-4">
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    className="btn px-6 py-2 bg-[#4dabf7] border-2 border-[#1971c2] text-white flex items-center justify-center"
                    onClick={() => {handleSave();}}
                  >
                    {isLoading ? <ButtonSpinner /> : "Enregistrer"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {setIsEditing(false);}}
                    className="btn px-6 py-2 bg-gray-400 border-2 border-gray-600 text-white"
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="btn px-6 py-2 bg-[#4dabf7] border-2 border-[#1971c2] text-white"
                >
                  Modifier
                </button>
              )}
            </div>

            {/* Messages */}
            {errorMessage && (
              <span className="text-red-500 text-md font-bold block text-center">
                {errorMessage}
              </span>
            )}
            {successMessage && (
              <span className="text-green-500 text-md font-bold block text-center">
                {successMessage}
              </span>
            )}
          </form>
        )}
      </div>
    </div>
  );
}