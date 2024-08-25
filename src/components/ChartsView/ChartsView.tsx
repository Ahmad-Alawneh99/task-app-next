'use client';
import {
	Chart,
	ArcElement,
	Legend,
	Tooltip,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import chartViewStyles from './ChartsView.module.scss';

Chart.register([ArcElement, Legend, Tooltip]);

interface ChartsViewProps {
	tasksSummary: {
		pendingTasks: number,
		inProgressTasks: number,
		completedTasks: number;
	}
}

export function ChartsView({ tasksSummary }: ChartsViewProps) {
	const pieChartData = {
		labels: [ 'Pending tasks', 'In progress tasks', 'Completed tasks'],
		datasets: [{
			label: 'Number of tasks: ',
			data: [tasksSummary.pendingTasks, tasksSummary.inProgressTasks, tasksSummary.completedTasks],
			backgroundColor: [
				'rgb(255, 99, 132)',
				'rgb(54, 162, 235)',
				'rgb(255, 205, 86)',
			],
			hoverOffset: 4,
		}],
	};

	return (
		<div>
			<div className={chartViewStyles.chartContainer}>
				<Pie data={pieChartData}/>
			</div>
		</div>
	);
}
