import { NextRequest } from 'next/server';
import { HttpStatus, TaskData } from '../../../../shared/interfaces.d';

export async function PUT(request: NextRequest, { params }: { params: { taskId: string } }) {
	try {
		const data: Partial<TaskData> = await request.json();

		if (!Object.keys(data).length) {
			return Response.json({ success: false, code: HttpStatus.BAD_REQUEST, message: 'No values to update' }, { status: HttpStatus.BAD_REQUEST });
		}

		const res = await fetch(`${process.env.BACKEND_API}/tasks/${params.taskId}`, {
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

		return Response.json(resAsJson, { status: resAsJson.status || HttpStatus.OK });
	} catch (error: any) {
		return Response.json({ success: false, code: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message || 'Unexpected error' }, { status: HttpStatus.INTERNAL_SERVER_ERROR });
	}
}

export async function DELETE(request: NextRequest, { params }: { params: { taskId: string } }) {
	try {
		const res = await fetch(`${process.env.BACKEND_API}/tasks/${params.taskId}`, {
			method: 'delete',
			headers: {
				Cookie: request.headers.get('Cookie') || '',
				'Content-Type': 'application/json',
			},
		});

		const resAsJson = await res.json();

		return Response.json(resAsJson, { status: resAsJson.status || HttpStatus.OK });
	} catch (error: any) {
		return Response.json({ success: false, code: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message || 'Unexpected error' }, { status: HttpStatus.INTERNAL_SERVER_ERROR });
	}
}
