import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import TasksView from '../../components/TasksView/TasksView';

export default async function AddTaskPage() {
	const cookiesData = cookies();

	// if user is not logged in, redirect to sign in
	if (!cookiesData.get('task_app_token')?.value.trim()) {
		redirect('../sign-in');
	}

	const authTokenCookie = `${cookiesData.get('task_app_token')?.name}=${cookiesData.get('task_app_token')?.value}`;

	const fetchUserData = async () => {
		const res = await fetch('http://localhost:3000/api/users/profile', { headers: { Cookie: authTokenCookie } });

		return await res.json();
	};

	const fetchTasksData = async () => {
		const res = await fetch('http://localhost:3000/api/tasks', { headers: { Cookie: authTokenCookie } });

		return await res.json();
	};

	const [userResponse, tasksResponse] = await Promise.all([fetchUserData(), fetchTasksData()]);

	if (userResponse.error) {
		userResponse.user = { name: 'Unknown error' };
	}

	if (tasksResponse.error) {
		tasksResponse.tasks = [];
	}

	return (
		<TasksView initialTasks={tasksResponse.tasks} user={userResponse.user}/>
	);
}
