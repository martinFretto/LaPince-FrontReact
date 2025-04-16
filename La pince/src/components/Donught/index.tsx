import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useNavigate } from "react-router-dom";
import { budgets } from "../../data/budget";

const DonutChart = () => {
	const navigate = useNavigate();

	// map de budgets pour récuperer les informations
	const categories = budgets.map((budget) => budget.name);
	const colors = budgets.map((budget) => budget.color);
	const series = budgets.map((budget) => budget.spent_amount);
	// récuperation et addition du total des budgets
	const totalBudget = budgets.reduce(
		(acc, budget) => acc + budget.allocated_amount,
		0,
	);
	// calcul du montant restant par budget
	const remainingByBudget = budgets.map(
		(budget) => budget.allocated_amount - budget.spent_amount,
	);

	const spent = series.reduce((acc, val) => acc + val, 0);
	// *100 / 100 pour les 2 chiffres apres la virgule
	const remaining = Math.round((totalBudget - spent) * 100) / 100;

	console.log("spent", spent);
	console.log("spent", spent);
	const options: ApexOptions = {
		chart: {
			type: "donut",
			events: {
				dataPointSelection: (_event, _chartContext, config) => {
					const selectedIndex = config.dataPointIndex;
					const selectedCategory = categories[selectedIndex];
					if (selectedCategory) {
						navigate(`/budgets/${selectedCategory}`, {
							state: {
								budget: budgets[selectedIndex], // on envoi seulement le budget selectionné
							},
						});
					}
				},
			},
		},
		labels: categories,
		colors,
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: true,
						name: {
							show: true,
							fontSize: "16px",
							color: "#666",
							offsetY: -10,
						},
						value: {
							show: true,
							fontSize: "20px",
							color: remaining < 0 ? "#ef4444" : "#000", // rouge si dépassement
							offsetY: 10,
							formatter: () => `${remaining} €`,
						},
						total: {
							show: true,
							label: `Budget 
							restant`,
							fontSize: "14px",
							fontWeight: "bold",
							color: "#666",
							formatter: () => `${remaining} €`,
						},
					},
				},
			},
		},
		dataLabels: {
			enabled: true,
			formatter: (_val, opts) => {
				const value = remainingByBudget[opts.seriesIndex];
				return `${Math.round(value * 100) / 100} €`;
			},
			style: {
				colors: ["#000"],
				fontSize: "14px",
				fontWeight: "normal",
			},
		},
		stroke: {
			show: true,
			width: 1,
			colors: ["#000"],
		},
		states: {
			hover: {
				filter: {
					type: "darken",
				},
			},
		},
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 300,
					},
					legend: {
						position: "bottom",
					},
				},
			},
		],
	};

	return (
		<div className="mt-4 justify-center flex ">
			<ReactApexChart
				options={options}
				series={series}
				type="donut"
				width="100%"
			/>
		</div>
	);
};

export default DonutChart;
