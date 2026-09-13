'use client';

import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Apple, Chrome } from 'lucide-react';
import { useForm } from 'react-hook-form';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ErrorForm,
  Input,
  Label,
  Separator,
} from '@/components/ui';
import { authService } from '@/services';
import { useAuthStore } from '@/stores';
import { type LoginInput, loginSchema } from '@/validators/auth.schema';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      setServerError(null);
      const res = await authService.login(data);
      setUser(res.user);
      router.push('/');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Invalid login credentials');
    }
  };

  return (
    <div className={className} {...props}>
      <Card className="border-border/60 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Login to your account</CardTitle>
          <CardDescription>Enter your email below to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {serverError && (
              <div className="bg-destructive/10 text-destructive rounded-lg p-3 text-xs font-medium">{serverError}</div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                error={!!errors.email}
                {...register('email')}
              />
              <ErrorForm error={errors.email?.message} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-xs underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                isPassword
                autoComplete="current-password"
                error={!!errors.password}
                {...register('password')}
              />
              <ErrorForm error={errors.password?.message} />
            </div>

            <Button type="submit" className="w-full" loading={isSubmitting}>
              Sign In
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card text-muted-foreground px-2">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button" className="w-full">
              <Apple className="mr-2 h-4 w-4" />
              Apple
            </Button>
            <Button variant="outline" type="button" className="w-full">
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          <div className="text-muted-foreground pt-2 text-center text-xs">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary font-medium underline-offset-4 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
