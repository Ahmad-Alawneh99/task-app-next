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
	dueDate: string;
}

export interface User {
	_id: string;
	email: string;
	name: string;
}

export enum HttpStatus {
	OK = 200,
	CREATED = 201,
	BAD_REQUEST = 400,
	INTERNAL_SERVER_ERROR = 500,
}
