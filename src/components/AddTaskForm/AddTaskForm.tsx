'use client';
import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import formStyles from '../sharedStyles/form.module.scss';
import { TaskStatus } from '../../shared/interfaces.d';

export const AddTaskForm = () => {
	const [error, setError] = useState({ isError: false, message: '' });
	const [isSubmitting, setSubmitting] = useState(false);
	const router = useRouter();
	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const statusRef = useRef<HTMLSelectElement>(null);
	const dueDateRef = useRef<HTMLInputElement>(null);

	const tomorrowsDate = new Date();
	tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);

	const handleSubmit = useCallback(async () => {

		if (!titleRef.current?.title.trim() || !statusRef.current?.value || !dueDateRef.current?.value) {
			setError({
				isError: true,
				message: 'Title, status and due date are required',
			});

			return;
		}

		setSubmitting(true);
		const data = {
			title: titleRef.current.value.trim(),
			description: descriptionRef.current?.value.trim() || '',
			status: statusRef.current.value,
			dueDate: dueDateRef.current.value,
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
				router.push('/tasks');
				router.refresh(); // force pages to refetch data, in order to get the newly added task
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
	}, [router]);

	return (
		<form className={formStyles.formContainer}>
			<p className={formStyles.formTitle}>Add a task</p>
			<input className={formStyles.simpleInput} type="text" title="title" placeholder="Task title" ref={titleRef}/>
			<textarea className={formStyles.textareaInput} title="description" placeholder="Task description" ref={descriptionRef}/>
			<label className={formStyles.inputLabel} htmlFor="status-select">Status</label>
			<select id="status-select" className={formStyles.simpleInput} title="status" ref={statusRef}>
				<option value={TaskStatus.PENDING}>Pending</option>
				<option value={TaskStatus.IN_PROGRESS}>In progress</option>
				<option value={TaskStatus.COMPLETED}>Complete</option>
			</select>
			<label className={formStyles.inputLabel} htmlFor="due-date-input">Due date</label>
			<input
				id="due-date-input"
				className={formStyles.simpleInput}
				type="date"
				title="dueDate"
				ref={dueDateRef}
				defaultValue={tomorrowsDate.toISOString().split('T')[0]}
				min={new Date().toISOString().split('T')[0]}
			/>
			<button
				type="button"
				className={formStyles.formSubmitButton}
				disabled={isSubmitting}
				onClick={handleSubmit}
			>Add a task</button>
			{error.isError && <p className={formStyles.formError}>{error.message}</p>}
		</form>
	);
};
