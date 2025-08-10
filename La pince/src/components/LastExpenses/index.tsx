// import { expenditure } from "../../data/expenditure";
// import { budgets } from "../../data/budget";
import type { Expense, ExpenseWithDetails } from "../../types/expense";
import { useEffect, useState } from "react";
import { fetchExpenses } from "../../api/expenses";

type DetailsExpensesProps = {
	budget?: number;
	onExpenseClick?: (expense: Expense) => void;
};

export default function LastExpenses({ onExpenseClick }: DetailsExpensesProps) {
	console.log("LAST EXPENSES COMPONENT");
//	const [expenses, setExpenses] = useState<Partial<Expense>[]>([]);
	const [expenses, setExpenses] = useState<Expense[]>([]);

	// useEffect qui va chercher les dépenses
/*	useEffect(() => {
		console.log("lastExpenses first useEffect")
		const getExpenses = async () => {
			try {
				const data = await fetchExpenses();
				if (Array.isArray(data)) {
					setExpenses(data);
				} else {
					console.warn("Données reçues non valides:", data);
				}
			} catch (error) {
				console.error("Erreur de chargement des budgets:", error);
			}
		};
		getExpenses();
	}, []);*/
	

	useEffect(() => {
		console.log("lastExpenses first useEffect")
		const getExpenses = async () => {
			try {
				const data = await fetchExpenses();
				if (Array.isArray(data.data)) {
					const expenses: Expense[] = data.data.map((item: ExpenseWithDetails) => ({
						...item.expenditure,
						budgetColor: item.budgetColor,
						budgetIcon: item.budgetIcon,
					}));
					setExpenses(expenses);
				} else {
					console.log("Données reçues non valides:", data);
				}
			} catch (err: unknown) {
				if (err instanceof Error) {
					console.log(err.message);
				} else {
					console.log("Une erreur est survenue lors de la récupération des budgets");
				}
			}
		};
		getExpenses();
	}, []);

	// Trier les dépenses par date décroissante
	const sortedExpenses = [...expenses].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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
						return (
							<tr
								key={exp.id}
								onClick={() => onExpenseClick?.(exp)} // on déclenche le callback ici
								className="cursor-pointer hover:bg-gray-100 transition"
							>
								<td colSpan={3}>
									<div className="border-b border-gray-300 flex justify-between items-center pb-2">
										<div className="flex items-center gap-2 justify-between w-full">
											<div className="flex w-7/10">
												<div className="">
													{/* Icône du budget avec style séparé du className pour récupérer la couleur du budget */}

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
												</div>

												{/* Description de la dépense & date */}
												<div className="flex flex-col w-6/10 justify-self-start ml-10">
													<span className="font-semibold text-base leading-tight mb-1">
														{exp.description}
													</span>
													<span className="italic text-[12px] text-gray-400">
														{new Date(exp.date).toLocaleDateString()}
													</span>
												</div>
											</div>
											{/* Montant de la dépense */}
											<div>
												<span className="font-semibold ">{exp.amount} €</span>
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
