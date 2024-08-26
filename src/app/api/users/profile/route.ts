import { NextRequest } from 'next/server';
import { HttpStatus } from '../../../../shared/interfaces.d';

export async function GET(request: NextRequest) {
	try {
		const res = await fetch(
			`${process.env.BACKEND_API}/users/profile`,
			{
				headers: {
					Cookie: request.headers.get('Cookie') || '',
				},
			}
		);

		const resAsJson = await res.json();

		return Response.json(resAsJson, { status: resAsJson.status || HttpStatus.OK });
	} catch (error: any) {
		return Response.json({ success: false, code: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message || 'Unexpected error' }, { status: HttpStatus.INTERNAL_SERVER_ERROR });
	}
}
