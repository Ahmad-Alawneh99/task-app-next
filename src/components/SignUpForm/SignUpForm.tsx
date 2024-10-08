'use client';
import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import formStyles from '../sharedStyles/form.module.scss';

export const SignUpForm = () => {
	const [error, setError] = useState({ isError: false, message: '' });
	const [isSubmitting, setSubmitting] = useState(false);
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const handleSubmit = useCallback(async () => {
		if (!emailRef.current?.value.trim() || !passwordRef.current?.value.trim()) {
			setError({
				isError: true,
				message: 'Email and password are required',
			});

			return;
		}

		setSubmitting(true);
		const data = {
			name: nameRef.current?.value.trim() || '',
			email: emailRef.current.value.trim(),
			password: passwordRef.current.value.trim(),
		};

		try {
			const response = await fetch('/api/users/sign-up', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const responseData = await response.json();

			if (responseData.success) {
				document.cookie = `task_app_token=${responseData.token}`;
				router.push('../');
				router.refresh();
			} else {
				setError({
					isError: true,
					message: responseData.message,
				});
			}
		} catch (error: any) {
			console.log(error);
			setError({
				isError: true,
				message: error.message,
			});
		}
		setSubmitting(false);
	}, [router]);

	return (
		<div>
			<form className={formStyles.formContainer}>
				<p className={formStyles.formTitle}>Sign up</p>
				<input className={formStyles.simpleInput} type="text" title="Name" placeholder="Name" ref={nameRef}/>
				<input className={formStyles.simpleInput} type="email" title="Email" placeholder="Email" ref={emailRef}/>
				<input className={formStyles.simpleInput} type="password" title="Password" placeholder="Password" ref={passwordRef}/>
				<button
					type="button"
					className={formStyles.formSubmitButton}
					disabled={isSubmitting}
					onClick={handleSubmit}
				>Sign up</button>
				{error.isError && <p className={formStyles.formError}>{error.message}</p>}
			</form>
			<p className={formStyles.cta}>Have an account? <Link href="/sign-in">Sign in here</Link></p>
		</div>
	);
};
