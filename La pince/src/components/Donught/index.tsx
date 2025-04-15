import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useNavigate } from "react-router-dom";

const DonutChart = () => {
	const navigate = useNavigate();

	const categories = ["test", "Crédit", "Transport", "Vacances"];
	const series = [450, 157, 255, 1024]; // dépenses
	const totalBudget = 2000;
	const spent = series.reduce((acc, val) => acc + val, 0);
	const remaining = totalBudget - spent;

	const options: ApexOptions = {
		chart: {
			type: "donut",
			events: {
				dataPointSelection: (_event, _chartContext, config) => {
					const selectedIndex = config.dataPointIndex;
					const selectedCategory = categories[selectedIndex];
					if (selectedCategory) {
						navigate(`/${selectedCategory.toLowerCase()}`);
					}
				},
			},
		},
		labels: categories,
		colors: ["#FFEC99", "#D0BFFF", "#A5D8FF", "#96F2D7"],
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
			formatter: (_val: number, opts) => {
				const value = opts.w.config.series[opts.seriesIndex];
				return `${value} €`;
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
