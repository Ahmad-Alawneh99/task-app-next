import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AddTaskForm } from '../../../components/AddTaskForm/AddTaskForm';

export default function AddTaskPage() {
	const cookiesData = cookies();

	// if user is not logged in, redirect to dashboard
	if (!cookiesData.get('task_app_token')) {
		redirect('../');
	}

	return (
		<AddTaskForm/>
	);
}
