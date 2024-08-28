'use client';
import { useState } from 'react';
import { TaskData } from '../../shared/interfaces.d';
import Task from '../Task/Task';
import taskListStyles from './TaskList.module.scss';

interface TaskListProps {
	initialTasks: TaskData[];
	noTasksMessage: string;
}

export function TaskList({ initialTasks = [], noTasksMessage }: TaskListProps) {
	const [tasks, setTasks] = useState<TaskData[]>(initialTasks);

	const onTaskDeleted = (taskId: string) => {
		setTasks((existingTasks) => existingTasks.filter((task) => task._id !== taskId));
	};

	return (
		tasks.length ?
			<div className={taskListStyles.taskList}>
				{tasks.map((task) => <Task task={task} key={task._id} onTaskDeleted={onTaskDeleted}/>)}
			</div>
			: <p className={taskListStyles.noTasks}>{noTasksMessage}</p>
	);
}
