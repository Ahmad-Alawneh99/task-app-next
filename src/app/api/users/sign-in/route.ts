import { NextRequest } from 'next/server';
import { HttpStatus } from '../../../../shared/interfaces.d';

interface SignInData {
	email?: string,
	password?: string,
}

export async function POST(request: NextRequest) {
	try {
		const data: SignInData = await request.json();

		if (!data.email || !data.password) {
			return Response.json({ success: false, code: HttpStatus.BAD_REQUEST, message: 'Email and password are required.' }, { status: HttpStatus.BAD_REQUEST });
		}

		const res = await fetch(`${process.env.BACKEND_API}/users/sign-in`, {
			method: 'post',
			body: JSON.stringify({
				email: data.email,
				password: data.password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const resAsJson = await res.json();

		return Response.json(resAsJson, { status: resAsJson.status || HttpStatus.OK });
	} catch (error: any) {
		return Response.json({ success: false, code: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message || 'Unexpected error' }, { status: HttpStatus.INTERNAL_SERVER_ERROR });
	}
}
