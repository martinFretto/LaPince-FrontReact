// import { expenditures } from "../../data/expenditure";
// import { budgets } from "../../data/budget";
import { useState } from "react";
import type { Expense } from "../../types/expense";
import type { Budget } from "../../types/budget";

type DetailsExpensesProps = {
	budget: number;
	expenses: Expense[];
	onExpenseClick?: (expense: any) => void;
};

export default function DetailsExpenses({
	expenses,
	onExpenseClick,
}: DetailsExpensesProps) {
	const [budgets] = useState<Budget[]>([]);



	// on va trier par date décroissante les dépenses d'un budget
	const sortedExpenses = [...expenses].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	const recentExpenses = sortedExpenses.slice(0, 10);

	return (
		<div className="p-4 -mt-4">
			<table className="w-full text-left border-separate border-spacing-y-2 border-2 border-gray-500 px-4">
				<tbody>
					{recentExpenses.map((exp) => {

						return (
							<tr
								key={exp.id}
								onClick={() => onExpenseClick?.(exp)}
								className="cursor-pointer hover:bg-gray-100 transition"
							>
								<td colSpan={3}>
									<div className="border-b border-gray-300 flex justify-between items-center pb-2">
										<div className="flex items-center gap-2 justify-between w-full">

											<div className="flex justify-between w-1/1">

												<div className="flex">
													<div
														className="w-10 h-10 border rounded-full p-1 flex items-center justify-center"
														style={{ backgroundColor: exp.budgetColor }}
													>
														<img
															src={exp.budgetIcon}
															alt={exp.description}
															className="w-full h-full object-contain"
														/>
													</div>

													{/* test */}
													<div className="flex flex-col ml-8">
														<span className="font-semibold">
															{exp.description}
														</span>
														<span className="italic text-[12px] text-gray-400">
															{new Date(exp.date).toLocaleDateString()}
														</span>
													</div>
												</div>

												<div>
													<span className="font-semibold">{exp.amount} €</span>
												</div>
											</div>
										</div>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
