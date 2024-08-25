import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const res = await fetch('http://localhost:3030/tasks/summary', {
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
