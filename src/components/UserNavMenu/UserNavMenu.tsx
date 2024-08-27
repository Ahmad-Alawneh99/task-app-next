import Link from 'next/link';
import navStyles from './UserNavMenu.module.scss';

interface UserNavMenu {
	username: string;
	ctaCopy: string;
	redirectPath: string;
}

export function UserNavMenu({ username, ctaCopy, redirectPath }: UserNavMenu) {
	return (
		<div className={navStyles.navContainer}>
			<p>Welcome back, {username}</p>
			<Link href={redirectPath}>{`${ctaCopy} ->`}</Link>
		</div>
	);
}
