import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignInForm } from '../../components/SignInForm/SignInForm';

export default function SignInPage() {
	const cookiesData = cookies();

	// if user is already logged in, redirect to dashboard
	if (cookiesData.get('task_app_token')) {
		redirect('../');
	}

	return (
		<SignInForm/>
	);
}
