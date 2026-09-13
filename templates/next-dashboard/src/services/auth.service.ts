import { http } from '@/lib/axios';
import type { User } from '@/types/auth';
import type { LoginInput, RegisterInput } from '@/validators/auth.schema';

export const authService = {
  async login(input: LoginInput): Promise<{ user: User; token: string }> {
    // In a real app, this posts to /api/auth/login or external backend
    // For demo purposes, we simulate or call internal API
    const response = await http.post<{ user: User; token: string }>('/auth/login', input).catch(() => ({
      data: {
        user: {
          id: 'user_1',
          name: input.email.split('@')[0],
          email: input.email,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
          role: 'Admin',
        },
        token: 'mock_jwt_token_' + Date.now(),
      },
    }));

    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', response.data.token);
    }

    return response.data;
  },

  async register(input: RegisterInput): Promise<{ user: User; token: string }> {
    const response = await http.post<{ user: User; token: string }>('/auth/register', input).catch(() => ({
      data: {
        user: {
          id: 'user_' + Date.now(),
          name: input.name,
          email: input.email,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
          role: 'Member',
        },
        token: 'mock_jwt_token_' + Date.now(),
      },
    }));

    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', response.data.token);
    }

    return response.data;
  },

  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
  },
};
