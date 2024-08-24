import { useCallback, useRef } from 'react';
import { TaskData, TaskStatus } from '../../shared/interfaces.d';
import taskStyles from './Task.module.scss';

interface TaskProps {
	task: TaskData,
	onTaskDelete: (taskId: string) => void;
}

const Task = ({ task, onTaskDelete }: TaskProps) => {
	const statusRef = useRef<HTMLSelectElement>(null);

	const handleDeleteTask = useCallback(async () => {
		try {
			const response = await fetch(`api/tasks/${task._id}`, {
				method: 'DELETE',
				credentials: 'include',
			});

			const data = await response.json();

			if (data.success) {
				onTaskDelete(task._id);
			} else {
				alert(`Failed to delete task: ${data.message}`);
			}
		} catch (error: any) {
			alert(`Failed to delete task: ${error.message}`);
		}
	}, [task._id, onTaskDelete]);

	const updateStatus = useCallback(async () => {
		try {
			const response = await fetch('api/tasks', {
				headers: { 'Content-type': 'application/json' },
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify({ completed: completedRef.current?.checked, taskId: task.id }),
			});

			const data = await response.json();

			if (!data.success) {
				alert(`Failed to update task: ${data.message}`);
			}
		} catch (error: any) {
			alert(`Failed to update task: ${error.message}`);
		}
	}, [task.id]);

	return (
		<div className={taskStyles.taskContainer}>
			<p className={taskStyles.taskTitle}>{task.title}</p>
			<p className={taskStyles.text}>{task.description}</p>
			<label className={taskStyles.inputLabel} htmlFor="status-select">Status</label>
			<select id="status-select" className={taskStyles.simpleInput} title="status" ref={statusRef} defaultValue={task.status}>
				<option value={TaskStatus.PENDING}>Pending</option>
				<option value={TaskStatus.IN_PROGRESS}>In progress</option>
				<option value={TaskStatus.COMPLETED}>Complete</option>
			</select>
			<p className={taskStyles.text}>Due date: ${task.dueDate}</p>
			<button
				type="button"
				className={taskStyles.deleteButton}
				onClick={handleDeleteTask}
			>Delete</button>
		</div>
	);
};

export default Task;
