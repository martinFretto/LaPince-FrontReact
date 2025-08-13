import type { NewExpense, UpdateExpense } from "../types/expense";

// Import de l'URL et on va chercher le token stocké dans le session storage pour le transmettre dans le header
const API_URL = import.meta.env.VITE_API_URL;
//const token = sessionStorage.getItem("authToken");

// Methode fetch qui va chercher toutes les dépenses
export async function fetchExpenses() {
	const res = await fetch(`${API_URL}/expenses/`, {
		method: "GET",
		credentials: 'include',
		headers: {
//			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
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
// Methode fetch qui va chercher les dépenses d'un budget
export async function fetchExpensesByBudget(budget: number) {
	const res = await fetch(`${API_URL}/expenses?budgetId=${budget}`, {
		method: "GET",
		credentials: 'include',
		headers: {
//			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
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

// Methode fetch qui ajoute une dépense à un budget
export async function addExpense( newExpense: NewExpense) {
	const res = await fetch(`${API_URL}/expenses`, {
		method: "POST",
		credentials: 'include',
		headers: {
		//	Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newExpense),
	});
	if (!res.ok) throw new Error("Erreur lors de l'ajout de la dépense");
	return res.json();
}

export async function updateExpense(expenseId: number, expenseToSend: UpdateExpense ) {
	const res = await fetch(`${API_URL}/expenses/${expenseId}/`, {
		method: "PATCH",
		credentials: 'include',
		headers: {
	//		Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			Connection: "close", // Force HTTP/1.1
		},
		body: JSON.stringify(expenseToSend),
	});
	if (!res.ok) throw new Error("Erreur lors de l'ajout de la dépense");
	return res.json();
}

// Methode fetch qui supprime une dépense par son id
export async function deleteExpense(expenseId: number) {
	const res = await fetch(`${API_URL}/expenses/${expenseId}/`, {
		method: "DELETE",
		credentials: 'include',
		headers: {
		//	Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) throw new Error("Erreur lors de la suppression de la dépense");

	return;
}
