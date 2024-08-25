import { NextRequest } from 'next/server';
import { TaskData } from '../../../../shared/interfaces.d';

export async function PUT(request: NextRequest, { params }: { params: { taskId: string } }) {
	try {
		const data: Partial<TaskData> = await request.json();

		if (!Object.keys(data).length) {
			return Response.json({ success: false, code: 400, message: 'No values to update' }, { status: 400 });
		}

		const res = await fetch(`http://localhost:3030/tasks/${params.taskId}`, {
			method: 'put',
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

		return Response.json(resAsJson, { status: resAsJson.status || 200 });
	} catch (error: any) {
		return Response.json({ success: false, code: 500, message: error.message || 'Unexpected error' }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest, { params }: { params: { taskId: string } }) {
	try {
		const res = await fetch(`http://localhost:3030/tasks/${params.taskId}`, {
			method: 'delete',
			headers: {
				Cookie: request.headers.get('Cookie') || '',
				'Content-Type': 'application/json',
			},
		});

		const resAsJson = await res.json();

		return Response.json(resAsJson, { status: resAsJson.status || 200 });
	} catch (error: any) {
		return Response.json({ success: false, code: 500, message: error.message || 'Unexpected error' }, { status: 500 });
	}
}
