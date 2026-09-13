import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default('https://jsonplaceholder.typicode.com'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

const processEnv = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NODE_ENV: process.env.NODE_ENV,
};

const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
}

export const env = parsed.success
  ? parsed.data
  : {
      NEXT_PUBLIC_API_URL: 'https://jsonplaceholder.typicode.com',
      NODE_ENV: (process.env.NODE_ENV as 'development' | 'test' | 'production') || 'development',
    };
