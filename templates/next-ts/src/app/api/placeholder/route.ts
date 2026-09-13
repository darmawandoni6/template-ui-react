import { NextResponse } from 'next/server';

import { placeholderService } from '@/services';

export async function GET() {
  try {
    const posts = await placeholderService.getPosts();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch placeholder data';
    return NextResponse.json({ message }, { status: 500 });
  }
}
