import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
	try {
		const response = await fetch(`${process.env.ASSISTANT_URL}/create/assistant`);
		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.log({ error });
		return NextResponse.json(error);
	}
}
