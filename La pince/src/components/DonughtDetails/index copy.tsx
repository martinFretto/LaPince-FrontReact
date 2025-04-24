import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { Budget } from "../../types/budget";
import { useEffect, useState } from "react";
import { fetchBudget } from "../../api/budget";
import type { Expense } from "../../types/Expense";

interface DonutDetailProps {
	expenses: Expense[];
	budget: Budget;
	expensesUpdatedTrigger: number;
}

export const DonutDetail: React.FC<DonutDetailProps> = ({
	expenses,
	budget,
	expensesUpdatedTrigger,
}) => {
	const [series, setSeries] = useState<number[]>([]);
	const [options, setOptions] = useState<ApexOptions>({});

	useEffect(() => {
		// Log to verify if the budget and expensesUpdatedTrigger change correctly
		console.log("Budget updated:", budget);
		console.log("Expenses Updated Trigger:", expensesUpdatedTrigger);

		// Calculer les montants à afficher dans le graphique
		const { allocated_amount, spent_amount } = budget;

		const remainingBudget = allocated_amount - spent_amount;
		const overBudget = remainingBudget < 0;

		const safeSpent = Math.min(spent_amount, allocated_amount);
		const overAmount = Math.max(spent_amount - allocated_amount, 0);
		const safeRemaining = Math.max(allocated_amount - spent_amount, 0);

		const newSeries = overBudget
			? [overAmount, allocated_amount]
			: [safeSpent, safeRemaining];

		// Log the calculated series to ensure it is calculated correctly
		console.log("Series data:", newSeries);

		const newOptions: ApexOptions = {
			chart: {
				type: "donut",
			},
			labels: overBudget ? ["", "Dépassement"] : ["", "Restant"],
			colors: overBudget ? ["#fff", "#FF4560"] : ["#fff", `${budget.color}`],
			stroke: {
				show: true,
				colors: ["transparent", "black"],
				width: 1,
			},
			legend: {
				position: "bottom",
				offsetX: -50,
			},
			dataLabels: {
				enabled: false,
			},
			plotOptions: {
				pie: {
					donut: {
						labels: {
							show: true,
							name: {
								show: true,
								fontSize: "16px",
								color: "#000",
								offsetY: -10,
							},
							value: {
								show: true,
								fontSize: "14px",
								color: remainingBudget < 0 ? "#ef4444" : "#8c8c8c",
								offsetY: 30,
								formatter: () =>
									`${remainingBudget.toFixed(2)} € / ${allocated_amount} €`,
							},
							total: {
								show: true,
								label: "",
								fontSize: "14px",
								fontWeight: "bold",
								color: "#666",
								formatter: () =>
									`${remainingBudget.toFixed(2)} € / ${allocated_amount} €`,
							},
						},
					},
				},
			},
		};

		// Log the new options to verify that they are being updated correctly
		console.log("Options updated:", newOptions);

		// Mise à jour de l'état
		setSeries(newSeries);
		setOptions(newOptions);
	}, [budget, expensesUpdatedTrigger]);

	return (
		<div>
			<h2 className="text-xl font-semibold flex justify-center -mt-2">
				{budget.name}
			</h2>
			<ReactApexChart
				options={options}
				series={series}
				type="donut"
				width="350"
			/>
		</div>
	);
};

export default DonutDetail;
