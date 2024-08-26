import { NextRequest } from 'next/server';
import { HttpStatus, TaskData } from '../../../shared/interfaces.d';

export async function POST(request: NextRequest) {
	try {
		const data: Partial<TaskData> = await request.json();

		if (!data.title || !data.dueDate || !data.status) {
			return Response.json({ success: false, code: HttpStatus.BAD_REQUEST, message: 'Title, status and due date are required' }, { status: HttpStatus.BAD_REQUEST });
		}

		const res = await fetch(`${process.env.BACKEND_API}/tasks`, {
			method: 'post',
			body: JSON.stringify({
				title: data.title,
				description: data.description,
				status: data.status,
				dueDate: data.dueDate,
			}),
			headers: {
				Cookie: request.headers.get('Cookie') || '',
				'Content-Type': 'application/json',
			},
		});

		const resAsJson = await res.json();

		return Response.json(resAsJson, { status: resAsJson.code || HttpStatus.CREATED });
	} catch (error: any) {
		return Response.json({ success: false, code: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message || 'Unexpected error' }, { status: HttpStatus.INTERNAL_SERVER_ERROR });
	}
}

export async function GET(request: NextRequest) {
	try {
		const taskId = request.nextUrl.searchParams.get('taskId') || '';
		const res = await fetch(`${process.env.BACKEND_API}/tasks/${taskId}`, {
			headers: {
				Cookie: request.headers.get('Cookie') || '',
				'Content-Type': 'application/json',
			},
		});

		const resAsJson = await res.json();

		return Response.json(resAsJson, { status: HttpStatus.OK });
	} catch (error: any) {
		return Response.json({ success: false, code: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message || 'Unexpected error' }, { status: HttpStatus.INTERNAL_SERVER_ERROR });
	}
}
