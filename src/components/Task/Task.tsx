import { useCallback, useState } from 'react';
import { TaskData, TaskStatus } from '../../shared/interfaces.d';
import taskStyles from './Task.module.scss';

interface TaskProps {
	task: TaskData,
	onTaskDeleted: (taskId: string) => void;
}

const Task = ({ task, onTaskDeleted }: TaskProps) => {
	const [status, setStatus] = useState(task.status);

	const deleteTask = useCallback(async () => {
		try {
			const response = await fetch(`api/tasks/${task._id}`, {
				method: 'DELETE',
				credentials: 'include',
			});

			const data = await response.json();

			if (data.success) {
				onTaskDeleted(task._id);
			} else {
				alert(`Failed to delete task: ${data.message}`);
			}
		} catch (error: any) {
			alert(`Failed to delete task: ${error.message}`);
		}
	}, [task._id, onTaskDeleted]);

	const updateTaskStatus = useCallback(async (value: TaskStatus) => {
		try {
			setStatus(value);
			const response = await fetch(`api/tasks/${task._id}`, {
				headers: { 'Content-type': 'application/json' },
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify({ status: value }),
			});

			const data = await response.json();

			if (!data.success) {
				setStatus(status); // restore old value on failure
			}
		} catch (error: any) {
			setStatus(status); // restore old value failure
		}
	}, [task._id, status]);

	const todaysDate = new Date();
	todaysDate.setHours(0, 0, 0);
	// Display date in red color if due date is met and status is not complete
	const isPastDue = todaysDate > new Date(task.dueDate) && (status !== TaskStatus.COMPLETED);

	return (
		<div className={taskStyles.taskContainer}>
			<p className={taskStyles.taskTitle}>{task.title}</p>
			<p className={taskStyles.text}>{task.description}</p>
			<p className={`${taskStyles.dateText} ${isPastDue ? taskStyles.pastDue : ''}`}>Due date: {task.dueDate.split('T')[0]}</p>
			<label className={taskStyles.selectTitle} htmlFor="status-select">Status</label>
			<select id="status-select" className={taskStyles.selectDropdown} title="status" value={status} onChange={(e) => updateTaskStatus(e.target.value as TaskStatus)}>
				<option value={TaskStatus.PENDING}>Pending</option>
				<option value={TaskStatus.IN_PROGRESS}>In progress</option>
				<option value={TaskStatus.COMPLETED}>Complete</option>
			</select>
			<button
				type="button"
				className={taskStyles.deleteButton}
				onClick={deleteTask}
			>Delete</button>
		</div>
	);
};

export default Task;
