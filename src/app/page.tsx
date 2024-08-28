import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ChartsView } from '../components/ChartsView/ChartsView';
import { UserNavMenu } from '../components/UserNavMenu/UserNavMenu';
import { TaskList } from '../components/TaskList/TaskList';

export default async function Dashboard() {
	const cookiesData = cookies();

	// if user is not logged in, redirect to sign in
	if (!cookiesData.get('task_app_token')?.value.trim()) {
		redirect('../sign-in');
	}

	const authTokenCookie = `${cookiesData.get('task_app_token')?.name}=${cookiesData.get('task_app_token')?.value}`;

	const summaryPromise = fetch(
		'http://localhost:3000/api/tasks/summary',
		{ headers: { Cookie: authTokenCookie } },
	);

	const userPromise = fetch(
		'http://localhost:3000/api/users/profile',
		{ headers: { Cookie: authTokenCookie } },
	);

	const [dashboardDataResponse, userDataResponse] = await Promise.all([summaryPromise, userPromise]);

	const dashboardDataAsJson = await dashboardDataResponse.json();
	const userDataAsJson = await userDataResponse.json();

	if (!dashboardDataAsJson.success || !userDataAsJson.success) {
		return (
			<div>
				server issue, try again later: {dashboardDataAsJson.message || userDataAsJson.message}
			</div>
		);
	}

	return (
		<div>
			<UserNavMenu username={userDataAsJson.user.name} ctaCopy="View Tasks" redirectPath="/tasks"/>
			<ChartsView tasksSummary={dashboardDataAsJson.tasksSummary}/>
			<h1>Tasks due soon</h1>
			<p>Up to three tasks that have the nearest expiration date and are not complete</p>
			<TaskList noTasksMessage="No tasks due soon" initialTasks={dashboardDataAsJson.tasksSummary.nearestDueTasks}/>
		</div>
	);
}
