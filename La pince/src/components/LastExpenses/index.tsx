import { expenditures } from "../../data/expenditure";

export default function LastExpenses() {
	const sortedExpenses = [...expenditures].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	// Garder les 5 ou 10 dernières par exemple
	const recentExpenses = sortedExpenses.slice(0, 6);
	return (
		<div className="p-4 mt-4">
			<h2 className="text-xl font-semibold mb-4 flex justify-center">
				Mes dernières dépenses
			</h2>
			<table className="w-full text-left border-separate border-spacing-y-2 border-2 border-gray-500 px-4">
				<tbody>
					{recentExpenses.map((exp) => (
						<tr key={exp.id}>
							<div className=" border-b-1 border-gray-300 flex justify-between items-center pb-2">
								<div className="flex flex-col">
									<td className="font-semibold">{exp.description}</td>
									<td className="italic text-[12px] text-gray-400">
										{new Date(exp.date).toLocaleDateString()}
									</td>
								</div>
								<td className="font-semibold">{exp.amount.toFixed(2)} €</td>
							</div>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
