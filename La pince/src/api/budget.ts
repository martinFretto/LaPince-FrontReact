const API_URL = import.meta.env.VITE_API_URL;

export async function fetchBudget(token) {
	const token = localStorage.getItem("token");
	const res = await fetch(`${API_URL}/budget`, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) throw new Error("Erreur lors du chargement du budget");
	return res.json();
}

export async function updateBudget(budget) {
	const token = localStorage.getItem("token");
	const res = await fetch(`${API_URL}/budget`, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(budget),
	});
	if (!res.ok) throw new Error("Erreur lors de la mise à jour");
	return res.json();
}
