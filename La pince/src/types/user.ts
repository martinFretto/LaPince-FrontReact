export type User = {
	id: number;
    email: string;
	first_name: string;
	last_name: string;
	total_budget: number;
    total_expenses: number;
};
export interface UpdatedUser {
	//email: string;
	first_name: string;
	last_name: string;
	total_budget: number;
}