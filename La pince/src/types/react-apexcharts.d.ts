declare module "react-apexcharts" {
	import React from "react";
	import type { ApexOptions } from "apexcharts";

	interface Props {
		options: ApexOptions;
		series: number[];
		type: string;
		width?: number | string;
		height?: number | string;
		value?: string | undefined;
		fontSize?: string | undefined;
	}

	export default class ReactApexChart extends React.Component<Props> {}
}
