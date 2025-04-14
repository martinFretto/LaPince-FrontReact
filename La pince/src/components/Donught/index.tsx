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
					size: "65%",
				},
			},
		},
		dataLabels: {
			enabled: true,
			formatter: (val: number, opts) => {
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
						width: 200,
					},
					legend: {
						position: "bottom",
					},
				},
			},
		],
	};

	return (
		<div className="relative w-full max-w-md mx-auto mt-8">
			{/* Overlay texte */}
			<div className="absolute inset-0 flex flex-col items-center place-self-center mr-24 pointer-events-none">
				<p className="text-lg font-bold text-gray-600">Budget restant</p>
				<p
					className={`text-xl font-semibold ${remaining < 0 ? "text-red-500" : "text-black"}`}
				>
					{remaining} €
				</p>
			</div>

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
