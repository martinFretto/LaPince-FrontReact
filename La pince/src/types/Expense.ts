export type Expense = {
	id: number;
	description: string;
	date: string;
	amount: string;
	budget_id: number;
	budgetColor?: string;
	budgetIcon?: string;
};

export interface NewExpense {
	description: string;
	payment_method: string;
	amount: number;
	date: string;
	budget_id: number;
}

// export interface ModifExpense {
// 	name: string;
// 	// allocated_amount: number;
// 	icon: string;
// 	// warning_amount: number;
// 	color: string;
// 	// selectedBudget: number;
// }
