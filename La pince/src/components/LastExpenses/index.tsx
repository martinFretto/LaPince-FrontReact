import { expenditures } from "../../data/expenditure";
import { budgets } from "../../data/budget";

export default function LastExpenses() {
	// Trier les dépenses par date décroissante
	const sortedExpenses = [...expenditures].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	// On ne garde que les 6 dernieres (0, 6)
	const recentExpenses = sortedExpenses.slice(0, 6);

	return (
		<div className="p-4 mt-4">
			<h2 className="text-xl font-semibold mb-4 flex justify-center">
				Mes dernières dépenses
			</h2>
			<table className="w-full text-left border-separate border-spacing-y-2 border-2 border-gray-500 px-4">
				<tbody>
					{recentExpenses.map((exp) => {
						// Récupérer le budget associé entre la dépense et le budget
						const relatedBudget = budgets.find((b) => b.id === exp.budget_id);

						return (
							<tr key={exp.id}>
								<td colSpan={3}>
									<div className="border-b border-gray-300 flex justify-between items-center pb-2">
										<div className="flex items-center gap-2 justify-between w-full">
											<div className="">
												{/* Icône du budget avec style séparé du className pour récupérer la couleur du budget */}
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

											{/* Description de la dépense & date */}
											<div className="flex flex-col w-6/10 justify-self-start">
												<span className="font-semibold">{exp.description}</span>
												<span className="italic text-[12px] text-gray-400">
													{new Date(exp.date).toLocaleDateString()}
												</span>
											</div>
											{/* Montant de la dépense */}
											<div>
												<span className="font-semibold ">
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
