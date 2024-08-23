import { NextRequest } from 'next/server';

interface SignUpData {
	name?: string,
	email?: string,
	password?: string,
}

export async function POST(request: NextRequest) {
	try {
		const data: SignUpData = await request.json();

		if (!data.email || !data.password) {
			return Response.json({ success: false, code: 400, message: 'Email and password are required.' }, { status: 400 });
		}

		const res = await fetch('http://localhost:3030/users/sign-up', {
			method: 'post',
			body: JSON.stringify({
				email: data.email,
				password: data.password,
				name: data.name,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const resAsJson = await res.json();

		return Response.json(resAsJson);
	} catch (error: any) {
		return Response.json({ success: false, code: 500, message: error.message || 'Unexpected error' }, { status: 500 });
	}
}
