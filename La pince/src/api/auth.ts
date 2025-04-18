const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(userData) {
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

export async function loginUser(credentials) {
	const res = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});

	if (!res.ok) throw new Error("Erreur de connexion");
	return res.json();
}
