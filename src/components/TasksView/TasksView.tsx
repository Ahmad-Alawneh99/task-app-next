'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Task from '../Task/Task';
import { TaskData, User } from '../../shared/interfaces.d';
import { UserNavMenu } from '../UserNavMenu/UserNavMenu';
import tasksViewStyles from './TasksView.module.scss';

interface TasksViewProps {
	initialTasks: TaskData[],
	user: User,
}

const TasksView = ({ initialTasks, user }: TasksViewProps) => {
	const [tasks, setTasks] = useState<TaskData[]>(initialTasks);
	const router = useRouter();

	const signOut = () => {
		document.cookie = 'task_app_token=';
		router.push('/sign-in');
		router.refresh();
	};

	const onTaskDeleted = (taskId: string) => {
		setTasks((existingTasks) => existingTasks.filter((task) => task._id !== taskId));
	};

	return (
		<div className={tasksViewStyles.tasksContainer}>
			<UserNavMenu username={user.name} ctaCopy="View Dashboard" redirectPath="/"/>
			<div className={tasksViewStyles.tasksNavbar}>
				<p className={tasksViewStyles.tasksTitle}>Your tasks</p>
				<div className={tasksViewStyles.controlButtons}>
					<Link className={tasksViewStyles.addTaskButton} href="/tasks/add">Add task</Link>
					<button type="button" className={tasksViewStyles.signOutButton} onClick={signOut}>Sign out</button>
				</div>
			</div>
			{
				tasks.length ?
					<div className={tasksViewStyles.taskList}>
						{tasks.map((task) => <Task task={task} key={task._id} onTaskDeleted={onTaskDeleted}/>)}
					</div>
					: <p className={tasksViewStyles.noTasks}>You don&apos;t have any tasks, start by adding one</p>
			}
		</div>
	);
};

export default TasksView;
