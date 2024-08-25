import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AddTaskForm } from '../../../components/AddTaskForm/AddTaskForm';

export default function AddTaskPage() {
	const cookiesData = cookies();

	// if user is not logged in, redirect to sign in page
	if (!cookiesData.get('task_app_token')?.value.trim()) {
		redirect('../sign-in');
	}

	return (
		<AddTaskForm/>
	);
}
