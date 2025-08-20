import type { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
// import { budgets } from "../../data/budget";
//import { useEffect, useState } from "react";
//import { fetchBudgets } from "../../api/budget";
import type { Budget } from "../../types/budget";


const DoughnutChart = ({ budgets }: { budgets: Budget[] }) => {

	const navigate = useNavigate();

	// map de budgets pour récuperer les informations
	const categories = budgets.map((budget) => budget.name);
	const categoriesId = budgets.map((budget) => budget.id);
	const colors = budgets.map((budget) => budget.color);

	// récuperation et addition du total des budgets
/*	const totalBudget = budgets.reduce(
		(acc, budget) => acc + Number(budget.allocated_amount),
		0
	);*/

	// calcul du montant restant par budget
	const remainingByBudget = budgets.map(
		(budget) => budget.allocated_amount - budget.spent_amount
	);

	const totalRemaining = remainingByBudget.reduce((acc, val) => acc + val, 0);

	const options: ApexOptions = {
		chart: {
			type: "donut",
			events: {
				dataPointSelection: (_event, _chartContext, config) => {
					const selectedIndex = config.dataPointIndex;
					const selectedCategory = categoriesId[selectedIndex];
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
					size: "70%",
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
							color: totalRemaining < 0 ? "#ef4444" : "#000", // rouge si dépassement
							offsetY: 10,
							formatter: () => `${Math.round(totalRemaining * 100) / 100} €`,
						},
						total: {
							show: true,
							label: `Budget 
							restant`,
							fontSize: "14px",
							fontWeight: "bold",
							color: "#666",
							formatter: () => `${Math.round(totalRemaining * 100) / 100} €`,
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
		legend: {
			show: true,
			position: "right", // 👈 change ça
			fontSize: "14px",
			labels: {
				colors: ["#000"],
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
	<>
		<div className="flex justify-center mt-8 ml-13 sm:mr-15">
		{budgets.length > 0 && (
			<div className="min-w-[300px] w-[300px] sm:w-[400px] lg:w-[500px] xl:w-[600px]">
			<ReactApexChart
				options={options}
				series={remainingByBudget}
				type="donut"
				height={300}
			/>
			</div>
		)}
		</div>
	</>
	);
};

export default DoughnutChart;
