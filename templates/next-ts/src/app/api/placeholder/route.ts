import { NextResponse } from 'next/server';

import { http } from '@lib/axios';

export async function GET() {
  const res = await http.get('https://jsonplaceholder.typicode.com/posts');

  return NextResponse.json(res.data, { status: 200 });
}
