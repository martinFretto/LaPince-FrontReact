const API_URL = import.meta.env.VITE_API_URL;

interface RegisterData {
	lastname: string;
	firstname: string;
	email: string;
	password: string;
}

export async function registerUser(userData: RegisterData) {
	// <-- utilisation du type ici
	const res = await fetch(`${API_URL}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});

	if (!res.ok) throw new Error("Erreur lors de l'inscription");
	return res.json();
}

interface LoginData {
	email: string;
	password: string;
}

export async function loginUser(userData: LoginData) {
	// <-- même principe ici
	const res = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});

	if (!res.ok) throw new Error("Erreur de connexion");
	return res.json();
}
