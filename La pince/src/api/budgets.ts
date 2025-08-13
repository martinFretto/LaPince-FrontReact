import type { ModifBudget, NewBudget } from "../types/budget";

// Import de l'URL et on va chercher le token stocké dans le session storage pour le transmettre dans le header
const API_URL = import.meta.env.VITE_API_URL;
//const token = sessionStorage.getItem("authToken");

//
// Methode fetch qui recupere les budgets
export async function fetchBudgets() {
	const res = await fetch(`${API_URL}/budgets`, {
		method: "GET",
		credentials: 'include',
		headers: {
			"Content-Type": "application/json",
	//		Authorization: `Bearer ${token}`,
		},
	});

	if(res.status===204){
		return {data:[]}
	}

	if (!res.ok) {
		const errorData = await res.json();
		const error = new Error(errorData.message);
		throw error;
	} 

	return res.json();
}

//
// Methode fetch qui ajoute un nouveau budget
export async function addBudget(newBudget: NewBudget) {

	const res = await fetch(`${API_URL}/budgets/`, {
		method: "POST",
		credentials: 'include',
		headers: {
//			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newBudget),
	});

	if (!res.ok) {
		const errorData = await res.json();
		const error = new Error(errorData.message);
		throw error;
	} 

	return res.json();
}

// Methode fetch qui modifie un budget
export async function updateBudget(budget: ModifBudget, id: number) {
	const res = await fetch(`${API_URL}/budgets/${id}/`, {
		method: "PATCH",
		credentials: 'include',
		headers: {
//			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(budget),
	});
	if (!res.ok) {
		const errorData = await res.json();
		const error = new Error(errorData.message);
		throw error;
	} 

	return res.json();
}

//
// Methode fetch qui supprime un budget par son id
export async function deleteBudget(id: number) {
	const res = await fetch(`${API_URL}/budgets/${id}/`, {
		method: "DELETE",
		credentials: 'include',
		headers: {
//			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) throw new Error("Erreur lors de la suppression du budget");

	return;
}
