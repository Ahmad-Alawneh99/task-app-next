import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AddTaskPage() {
	const cookiesData = cookies();

	// if user is not logged in, redirect to dashboard
	if (!cookiesData.get('task_app_token')) {
		redirect('../');
	}

	const authTokenCookie = `${cookiesData.get('task_app_token')?.name}=${cookiesData.get('task_app_token')?.value}`;

	const fetchUserData = async () => {
		const res = await fetch('http://localhost:3000/api/users/profile', { headers: { Cookie: authTokenCookie } });

		return await res.text();
	};

	const fetchTasksData = async () => {
		const res = await fetch('http://localhost:3000/api/tasks', { headers: { Cookie: authTokenCookie } });

		return await res.text();
	};

	const [userData, tasksData] = await Promise.all([fetchUserData(), fetchTasksData()]);

	console.log(userData, tasksData);

	return (
		<p>Tasks page</p>
	);
}
