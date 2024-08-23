'use client';
import { useCallback, useRef, useState } from 'react';
import formStyles from '../sharedStyles/form.module.scss';
import { TaskStatus } from '../../shared/interfaces.d';

export const AddTaskForm = () => {
	const [error, setError] = useState({ isError: false, message: '' });
	const [isSubmitting, setSubmitting] = useState(false);
	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const completedRef = useRef<HTMLInputElement>(null);

	const handleSubmit = useCallback(async () => {

		setSubmitting(true);
		const data = {
			title: titleRef.current?.value || '',
			description: descriptionRef.current?.value || '',
			completed: completedRef.current?.checked,
		};

		try {
			const response = await fetch('/api/tasks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(data),
			});

			const responseData = await response.json();

			if (responseData.success) {
				// @TODO: Handle navigate
			} else {
				setError({
					isError: true,
					message: responseData.message,
				});
			}
		} catch (error: any) {
			setError({
				isError: true,
				message: error.message,
			});
		}
		setSubmitting(false);
	}, []);

	return (
		<form className={formStyles.formContainer}>
			<p className={formStyles.formTitle}>Add a task</p>
			<input className={formStyles.simpleInput} type="text" title="title" placeholder="Task title" ref={titleRef}/>
			<textarea className={formStyles.textareaInput} title="description" placeholder="Task description" ref={descriptionRef}/>
			<select>
				<option value={TaskStatus.PENDING}>Pending</option>
				<option value={TaskStatus.IN_PROGRESS}>In progress</option>
				<option value={TaskStatus.COMPLETED}>Complete</option>
			</select>
			<button
				type="button"
				className={formStyles.formSubmitButton}
				disabled={isSubmitting}
				onClick={handleSubmit}
			>Add a task</button>
			{error.isError && <p className="form-error">{error.message}</p>}
		</form>
	);
};
