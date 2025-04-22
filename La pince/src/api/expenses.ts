const API_URL = import.meta.env.VITE_API_URL;

export async function fetchExpenses() {
	const token = localStorage.getItem("token");
	const res = await fetch(`${API_URL}/expenses`, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) throw new Error("Erreur lors du chargement des dépenses");
	return res.json();
}

export async function addExpense() {
	const token = localStorage.getItem("token");
	const res = await fetch(`${API_URL}/expenses`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		// body: JSON.stringify(expense),
	});
	if (!res.ok) throw new Error("Erreur lors de l'ajout de la dépense");
	return res.json();
}
