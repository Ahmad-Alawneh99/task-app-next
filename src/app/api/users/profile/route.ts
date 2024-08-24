import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const res = await fetch(
			'http://localhost:3030/users/profile',
			{
				headers: {
					Cookie: request.headers.get('Cookie') || '',
				},
			}
		);

		const resAsJson = await res.json();

		return Response.json(resAsJson, { status: resAsJson.status || 200 });
	} catch (error: any) {
		return Response.json({ success: false, code: 500, message: error.message || 'Unexpected error' }, { status: 500 });
	}
}
