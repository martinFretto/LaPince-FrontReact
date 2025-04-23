import type { Expense, NewExpense } from "../types/Expense";

// Import de l'URL et du token
const API_URL = import.meta.env.VITE_API_URL;
const token = sessionStorage.getItem("authToken");

//
// Methode fetch qui va chercher toutes les dépenses
export async function fetchExpenses(): Promise<Expense[]> {
	const res = await fetch(`${API_URL}/expenses/`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) throw new Error("Erreur lors du chargement des dépenses");

	const json = await res.json();

	// Tu aplatis ici les objets pour ne garder que expenditure + color + icon
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const flatExpenses: Expense[] = json.data.map((item: any) => ({
		...item.expenditure,
		budgetColor: item.budgetColor,
		budgetIcon: item.budgetIcon,
	}));

	return flatExpenses;
}

//
// Methode fetch qui va chercher les dépenses d'un budget
export async function fetchOneBudgetExpenses() {
	const res = await fetch(`${API_URL}/expenses?budgetId=`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) throw new Error("Erreur lors du chargement des dépenses");
	return res.json();
}

//
//
export async function addExpense(
	newExpense: NewExpense,
	selectedBudget: number,
) {
	console.log("token avant le AddExpense", token);
	console.log("selectedBudget", selectedBudget);
	console.log("newExpense", newExpense);

	const res = await fetch(`${API_URL}/expenses`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newExpense),
	});
	if (!res.ok) throw new Error("Erreur lors de l'ajout de la dépense");
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
