import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { Budget } from "../../types/budget";

const DonutDetail = ({ budget }: { budget: Budget }) => {
	const { allocated_amount, spent_amount } = budget;

	const remainingBudget = allocated_amount - spent_amount;

	const overBudget = spent_amount > allocated_amount;

	// const series = overBudget
	// 	? [allocated_amount, spent_amount - allocated_amount]
	// 	: [spent_amount, remainingBudget];
	const safeSpent = Math.min(spent_amount, allocated_amount);
	const overAmount = Math.max(spent_amount - allocated_amount, 0);
	const safeRemaining = Math.max(allocated_amount - spent_amount, 0);
	const series = overBudget
		? [overAmount, allocated_amount]
		: [safeSpent, safeRemaining];

	const options: ApexOptions = {
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

	return (
		<div>
			<h2 className="text-xl font-semibold flex justify-center -mt-2">
				{budget.name}
			</h2>
			<ReactApexChart
				options={options}
				series={series}
				type="donut"
				width="300"
			/>
		</div>
	);
};

export default DonutDetail;
