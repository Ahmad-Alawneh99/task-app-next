import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Task from '../Task/Task';
import { TaskData, User } from '../../shared/interfaces.d';
import { getAuthCookie } from '../../shared/utils';

const TasksView = ({ tasks, user }) => {
	const router = useRouter();

	const navigateToAddTaskPage = () => {
		router.push('/add-task');
	};

	const signOut = () => {
		document.cookie = 'task_app_token=';
		router.push('/sign-in');
	};

	const onTaskDelete = (taskId: string) => {
		setTasks((existingTasks) => existingTasks.filter((task) => task.id !== taskId));
	};

	return (
		<div className="tasks-container">
			<div className="user-info">
				<p>Welcome back, {user.name}</p>
			</div>
			<div className="tasks-navbar">
				<p className="tasks-title">Your tasks</p>
				<div className="control-buttons">
					<button type="button" className="add-task-button" onClick={navigateToAddTaskPage}>Add task</button>
					<button type="button" className="sign-out-button" onClick={signOut}>Sign out</button>
				</div>
			</div>
			{
				!!tasks.length &&
					<div className="task-list">
						{tasks.map((task) => <Task task={task} key={task.id} onTaskDelete={onTaskDelete}/>)}
					</div>
			}
			{ !tasks.length && <p className="no-tasks">You don&apos;t have any tasks, start by adding one</p> }
		</div>
	);
};

export default TasksView;
