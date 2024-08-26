'use client';
import { ChartBlock } from '../ChartBlock/ChartBlock';
import chartViewStyles from './ChartsView.module.scss';

interface ChartsViewProps {
	tasksSummary: {
		pendingTasks: number;
		inProgressTasks: number;
		completedTasks: number;
		tasksPerDueDate: { [key: string]: number },
	},
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

	const barChartData = {
		labels: Object.keys(tasksSummary.tasksPerDueDate),
		datasets: [{
			label: 'Number of tasks',
			data: Object.values(tasksSummary.tasksPerDueDate),
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
			],
			borderColor: [
				'rgb(255, 99, 132)',
			],
			borderWidth: 1,
		}],
		options: {
			scales: {
				y: {
					ticks: {
						beginAtZero: false,
						callback: (value: number) => value % 1 === 0 ? value : undefined,
					},
				},
			},
		},
	};

	return (
		<div className={chartViewStyles.container}>
			<ChartBlock type="pie" config={pieChartData} title="Tasks status"/>
			<ChartBlock type="bar" config={barChartData} title="Number of Tasks per due date"/>
		</div>
	);
}
