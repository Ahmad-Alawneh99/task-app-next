import { NextRequest } from 'next/server';
import { TaskData } from '../../../shared/interfaces.d';

export async function POST(request: NextRequest) {
	try {
		const data: Partial<TaskData> = await request.json();

		if (!data.title || !data.dueDate || !data.status) {
			return Response.json({ success: false, code: 400, message: 'Title, status and due date are required' }, { status: 400 });
		}

		const res = await fetch('http://localhost:3030/tasks', {
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

		return Response.json(resAsJson, { status: resAsJson.code || 201 });
	} catch (error: any) {
		return Response.json({ success: false, code: 500, message: error.message || 'Unexpected error' }, { status: 500 });
	}
}

export async function GET(request: NextRequest) {
	try {
		const taskId = request.nextUrl.searchParams.get('taskId') || '';
		const res = await fetch(`http://localhost:3030/tasks/${taskId}`, {
			headers: {
				Cookie: request.headers.get('Cookie') || '',
				'Content-Type': 'application/json',
			},
		});

		const resAsJson = await res.json();

		return Response.json(resAsJson, { status: 200 });
	} catch (error: any) {
		return Response.json({ success: false, code: 500, message: error.message || 'Unexpected error' }, { status: 500 });
	}
}

// @TODO: Extract common logic into a separate function
