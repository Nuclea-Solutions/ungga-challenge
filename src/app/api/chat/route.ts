import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
	try {
		const json = await req.json();
		const { message, userId, assistant, thread } = json;

		const response = await axios.post(`${process.env.ASSISTANT_URL}/message` ?? '', {
			message,
			user_id: userId,
			assistant: assistant,
			thread: thread
		});
		return NextResponse.json(response.data);
	} catch (error) {
		console.log({ error });
		return NextResponse.json(error);
	}
}
