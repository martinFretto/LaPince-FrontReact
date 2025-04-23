export interface Budget {
	user_id: number;
	id: number;
	name: string;
	allocated_amount: number;
	icon: string;
	warning_amount: number;
	color: string;
	spent_amount: number;
	created_at: string;
	updated_at: string;
}

export interface NewBudget {
	name: string;
	allocated_amount: number;
	icon: string;
	warning_amount: number;
	color: string;
}

export interface ModifBudget {
	name: string;
	allocated_amount: number;
	icon: string;
	warning_amount: number;
	color: string;
	// selectedBudget: number;
}
