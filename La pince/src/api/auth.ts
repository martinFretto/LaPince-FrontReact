const API_URL = import.meta.env.VITE_API_URL;

interface RegisterData {
	lastname: string;
	firstname: string;
	email: string;
	password: string;
}

export async function registerUser(userData: RegisterData) {
	const res = await fetch(`${API_URL}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
		mode: "cors",
	});
	if (!res.ok) {
		// Récupereration de l'erreur
		const errorData = await res.json();
		const error = new Error("Erreur lors de l'inscription");
		// Ajouter la réponse d'erreur à l'erreur lancée
		(error as any).response = errorData;
		// Envoi de l'erreur avec les données
		throw error;
	}

	const data = await res.json();
	console.log("Réponse API:", data);
	return data;
}

interface LoginData {
	email: string;
	password: string;
}

export async function loginUser(userData: LoginData) {
	const res = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});

	if (!res.ok) throw new Error("Erreur de connexion");
	const data = await res.json();
	sessionStorage.setItem("token", data.token);
	console.log("Réponse API:", data);
	console.log("token recu au login", data.token);

	return data;
}

export async function ResetPass(userData: LoginData) {
	const res = await fetch(
		`${API_URL}/auth/reset-password-request
`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		}
	);

	if (!res.ok) throw new Error("Erreur de connexion");
	const data = await res.json();
	return data;
}
