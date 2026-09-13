import { NextResponse } from 'next/server';

import { loginSchema } from '@/validators/auth.schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = loginSchema.parse(body);

    const user = {
      id: 'usr_1',
      name: validated.email.split('@')[0],
      email: validated.email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
      role: 'Admin',
    };

    return NextResponse.json({
      user,
      token: 'jwt_token_' + Date.now(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid request payload';
    return NextResponse.json({ message }, { status: 400 });
  }
}
