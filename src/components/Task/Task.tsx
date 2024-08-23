import { useCallback, useRef } from 'react';
import { TaskData } from '../../shared/interfaces.d';
import taskStyles from './Task.module.scss';

interface TaskProps {
	task: TaskData,
	onTaskDelete: (taskId: string) => void;
}

const Task = ({ task, onTaskDelete }: TaskProps) => {
	// const completedRef = useRef<HTMLInputElement>(null);

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

	// const toggleCompleted = useCallback(async () => {
	// 	try {
	// 		const response = await fetch('api/tasks', {
	// 			headers: { 'Content-type': 'application/json' },
	// 			method: 'PUT',
	// 			credentials: 'include',
	// 			body: JSON.stringify({ completed: completedRef.current?.checked, taskId: task.id }),
	// 		});

	// 		const data = await response.json();

	// 		if (!data.success) {
	// 			alert(`Failed to update task: ${data.message}`);
	// 		}
	// 	} catch (error: any) {
	// 		alert(`Failed to update task: ${error.message}`);
	// 	}
	// }, [task.id]);

	return (
		<div className={taskStyles.taskContainer}>
			<p className={taskStyles.taskTitle}>{task.title}</p>
			<p className={taskStyles.taskDescription}>{task.description}</p>
			{/* <div className={taskStyles.checkboxSection}>
				<input
					type="checkbox"
					title="completed"
					id={`completed-${task.id}`}
					defaultChecked={task.completed}
					ref={completedRef}
					onChange={toggleCompleted}
				/>
				<label htmlFor={`completed-${task.id}`}>Completed</label>
			</div> */}
			<button
				type="button"
				className={taskStyles.deleteButton}
				onClick={handleDeleteTask}
			>Delete</button>
		</div>
	);
};

export default Task;
