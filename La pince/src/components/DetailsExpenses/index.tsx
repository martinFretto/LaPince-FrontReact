import { budgets } from "../../data/budget";
import { expenditures } from "../../data/expenditure";

type DetailsExpensesProps = {
	budget?: number;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	onExpenseClick?: (expense: any) => void;
};

export default function DetailsExpenses({
	budget,
	onExpenseClick,
}: DetailsExpensesProps) {
	// on va filtrer les dépenses d'un budget
	const filteredExpenses = budget
		? expenditures.filter((exp) => exp.budget_id === budget)
		: expenditures;

	// on va trier par date décroissante les dépenses d'un budget
	const sortedExpenses = [...filteredExpenses].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	const recentExpenses = sortedExpenses.slice(0, 10);

	return (
		<div className="p-4 -mt-4">
			<table className="w-full text-left border-separate border-spacing-y-2 border-2 border-gray-500 px-4">
				<tbody>
					{recentExpenses.map((exp) => {
						const relatedBudget = budgets.find((b) => b.id === exp.budget_id);

						return (
							<tr
								key={exp.id}
								onClick={() => onExpenseClick?.(exp)}
								className="cursor-pointer hover:bg-gray-100 transition"
							>
								<td colSpan={3}>
									<div className="border-b border-gray-300 flex justify-between items-center pb-2">
										<div className="flex items-center gap-2 justify-between w-full">
											<div>
												{relatedBudget?.icon && (
													<div
														className="w-10 h-10 border rounded-full p-1 flex items-center justify-center"
														style={{ backgroundColor: relatedBudget.color }}
													>
														<img
															src={relatedBudget.icon}
															alt={relatedBudget.name}
															className="w-full h-full object-contain"
														/>
													</div>
												)}
											</div>

											<div className="flex flex-col w-6/10">
												<span className="font-semibold">{exp.description}</span>
												<span className="italic text-[12px] text-gray-400">
													{new Date(exp.date).toLocaleDateString()}
												</span>
											</div>

											<div>
												<span className="font-semibold">
													{exp.amount.toFixed(2)} €
												</span>
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
