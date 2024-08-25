import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ChartsView } from '../components/ChartsView/ChartsView';

export default async function Dashboard() {
	const cookiesData = cookies();

	// if user is not logged in, redirect to sign in
	if (!cookiesData.get('task_app_token')?.value.trim()) {
		redirect('../sign-in');
	}

	const authTokenCookie = `${cookiesData.get('task_app_token')?.name}=${cookiesData.get('task_app_token')?.value}`;

	const dashboardDataResponse = await fetch(
		'http://localhost:3000/api/tasks/summary',
		{ headers: { Cookie: authTokenCookie } },
	);
	const dashboardDataAsJson = await dashboardDataResponse.json();

	if (!dashboardDataAsJson.success) {
		return (
			<div>
				server issue, try again later: {dashboardDataAsJson.message}
			</div>
		);
	}

	return (
		<div>
			<ChartsView tasksSummary={dashboardDataAsJson.tasksSummary}/>
		</div>
	);
}
