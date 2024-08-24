import { NextRequest } from 'next/server';
import { TaskData } from '../../../shared/interfaces.d';

// @TODO: Need to forward the cookie

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

		return Response.json(resAsJson, { status: resAsJson.code || 200 });
	} catch (error: any) {
		return Response.json({ success: false, code: 500, message: error.message || 'Unexpected error' }, { status: 500 });
	}
}

export async function GET(request: NextRequest) {
	// @TODO: if query exists, find one, else find all
	try {
		const data: Partial<TaskData> = await request.json();

		if (!data.title) {
			return Response.json({ /* TODO */ });
		}

		const res = await fetch('http://localhost:3030/tasks', {
			method: 'post',
			body: JSON.stringify({
				title: data.title,
				description: data.description,
				completed: data.completed,
			}),
		});

		const resAsJson = await res.json();

		return Response.json(resAsJson);
	} catch (error: any) {
		return Response.json({ success: false, code: 500, message: error.message || 'Unexpected error' });
	}
}

// @TODO: Extract common logic into a separate function

export async function PUT(request: NextRequest) {
	try {
		const data: Partial<TaskData> = await request.json();

		if (!data.title) {
			return Response.json({ /* TODO */ });
		}

		const res = await fetch('http://localhost:3030/tasks', {
			method: 'post',
			body: JSON.stringify({
				title: data.title,
				description: data.description,
				completed: data.completed,
			}),
		});

		const resAsJson = await res.json();

		return Response.json(resAsJson);
	} catch (error: any) {
		return Response.json({ success: false, code: 500, message: error.message || 'Unexpected error' });
	}
}

export async function DELETE(request: NextRequest) {
	// @TODO
}
