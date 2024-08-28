'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import contentHeaderStyles from './ContentHeader.module.scss';

export function ContentHeader({ title }: { title: string }) {
	const router = useRouter();

	const signOut = () => {
		document.cookie = 'task_app_token=';
		router.push('/sign-in');
		router.refresh();
	};

	return (
		<div className={contentHeaderStyles.headerContainer}>
			<p className={contentHeaderStyles.title}>{title}</p>
			<div className={contentHeaderStyles.controlButtons}>
				<Link className={contentHeaderStyles.addTaskButton} href="/tasks/add">Add task</Link>
				<button type="button" className={contentHeaderStyles.signOutButton} onClick={signOut}>Sign out</button>
			</div>
		</div>
	);
}
