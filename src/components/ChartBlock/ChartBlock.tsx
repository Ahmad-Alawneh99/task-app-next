'use client';
import {
	Chart,
	ArcElement,
	Legend,
	Tooltip,
	CategoryScale,
	LinearScale,
	BarElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import chartBlockStyles from './ChartBlock.module.scss';

Chart.register([ArcElement, Legend, Tooltip, CategoryScale, LinearScale, BarElement]);

interface ChartBlockProps {
	type: string;
	config: any;
	title: string;
}

export function ChartBlock({ type, config, title }: ChartBlockProps) {
	const Chart = type === 'bar' ? Bar : Pie;

	return (
		<div className={chartBlockStyles.container}>
			<p className={chartBlockStyles.title}>{title}</p>
			<Chart className={chartBlockStyles.chart} data={config}/>
		</div>
	);
}
