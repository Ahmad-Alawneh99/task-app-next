export enum TaskStatus {
	PENDING = 'PENDING',
	IN_PROGRESS = 'IN PROGRESS',
	COMPLETED = 'COMPLETED',
}

export interface TaskData {
	status: TaskStatus;
	description: string;
	_id: string;
	owner: string;
	title: string;
	dueDate: any // @TODO: Typing for dates
}

export interface User {
	_id: string;
	email: string;
	name: string;
}
