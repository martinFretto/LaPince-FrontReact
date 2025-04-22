import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { Budget } from "../../types/budget";

// Déclare le type en ligne ici
// type Budget = {
// 	id: number;
// 	name: string;
// 	warning_amount: number;
// 	spent_amount: number;
// 	allocated_amount: number;
// 	color: string;
// 	icon: string;
// 	user_id: number;
// 	created_at: string;
// 	updated_at: string | null;
// };

const DonutDetail = ({ budget }: { budget: Budget }) => {
	const { allocated_amount, spent_amount } = budget;

	const remainingBudget = Math.round(allocated_amount - spent_amount);
	const overBudget = spent_amount > allocated_amount;

	const series = overBudget
		? [allocated_amount, spent_amount - allocated_amount]
		: [spent_amount, remainingBudget];

	const options: ApexOptions = {
		chart: {
			type: "donut",
		},
		labels: overBudget ? ["Budget alloué", "Dépassement"] : ["", "Restant"],
		colors: overBudget ? ["#00E396", "#FF4560"] : ["#fff", `${budget.color}`],
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
							formatter: () => `${remainingBudget} € / ${allocated_amount} €`,
						},
						total: {
							show: true,
							label: "",
							fontSize: "14px",
							fontWeight: "bold",
							color: "#666",
							formatter: () => `${remainingBudget} € / ${allocated_amount} €`,
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
