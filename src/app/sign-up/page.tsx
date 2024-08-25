import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm';

export default function SignUpPage() {
	const cookiesData = cookies();

	// if user is already logged in, redirect to dashboard
	if (cookiesData.get('task_app_token')?.value.trim()) {
		redirect('../');
	}

	return (
		<SignUpForm/>
	);
}
