import { NextResponse } from 'next/server';

import { registerSchema } from '@/validators/auth.schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = registerSchema.parse(body);

    const user = {
      id: 'usr_' + Date.now(),
      name: validated.name,
      email: validated.email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
      role: 'Member',
    };

    return NextResponse.json({
      user,
      token: 'jwt_token_' + Date.now(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid registration payload';
    return NextResponse.json({ message }, { status: 400 });
  }
}
