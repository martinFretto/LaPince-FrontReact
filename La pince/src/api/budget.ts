import type { ModifBudget, NewBudget } from "../types/budget";

const API_URL = import.meta.env.VITE_API_URL;

// On va chercher le token stocké dans le session storage pour le transmettre dans le header
const token = sessionStorage.getItem("authToken");
console.log(token);

// Methode fetch qui recupere les budgets
export async function fetchBudget() {
	const res = await fetch(`${API_URL}/budgets/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) throw new Error("Erreur lors du chargement du budget");
	return res.json();
}

// Methode fetch qui ajoute un nouveau budget
export async function AddBudget(newBudget: NewBudget) {
	console.log("token avant le Addbudget", token);

	const res = await fetch(`${API_URL}/budgets/`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,

			"Content-Type": "application/json",
		},
		body: JSON.stringify(newBudget),
	});
	if (!res.ok) throw new Error("Erreur lors de l'ajout du budget");
	return res.json();
}

// Methode fetch qui modifie un budget
export async function updateBudget(budget: ModifBudget, id: number) {
	const res = await fetch(`${API_URL}/budgets/${id}/`, {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("token")}`, // ou autre méthode
			"Content-Type": "application/json",
		},
		body: JSON.stringify(budget),
	});

	if (!res.ok) {
		const err = await res.json().catch(() => ({}));
		console.error("Erreur API :", err);
		throw new Error("Erreur lors de la mise à jour du budget");
	}

	return res.json();
}

// Methode fetch qui supprime un budget par son id
export async function DeleteBudget(id: number) {
	const res = await fetch(`${API_URL}/budgets/${id}/`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) throw new Error("Erreur lors de la suppression du budget");

	return;
}
