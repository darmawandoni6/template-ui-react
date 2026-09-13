'use client';

import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Apple, Chrome } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  ErrorForm,
  Input,
  Label,
  Separator,
} from '@/components/ui';
import { authService } from '@/services';
import { useAuthStore } from '@/stores';
import { type RegisterInput, registerSchema } from '@/validators/auth.schema';

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      setServerError(null);
      const res = await authService.register(data);
      setUser(res.user);
      router.push('/');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <div className={className} {...props}>
      <Card className="border-border/60 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription>Enter your information below to create your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {serverError && (
              <div className="bg-destructive/10 text-destructive rounded-lg p-3 text-xs font-medium">{serverError}</div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" autoComplete="name" error={!!errors.name} {...register('name')} />
              <ErrorForm error={errors.name?.message} />
            </div>

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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                isPassword
                autoComplete="new-password"
                placeholder="At least 8 chars, 1 uppercase, 1 number"
                error={!!errors.password}
                {...register('password')}
              />
              <ErrorForm error={errors.password?.message} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                isPassword
                autoComplete="new-password"
                placeholder="Re-enter password"
                error={!!errors.confirmPassword}
                {...register('confirmPassword')}
              />
              <ErrorForm error={errors.confirmPassword?.message} />
            </div>

            <div className="space-y-1 pt-1">
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    label={
                      <span className="text-muted-foreground text-xs">
                        I agree to the{' '}
                        <a href="#" className="text-primary underline-offset-4 hover:underline">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-primary underline-offset-4 hover:underline">
                          Privacy Policy
                        </a>
                      </span>
                    }
                  />
                )}
              />
              <ErrorForm error={errors.terms?.message} />
            </div>

            <Button type="submit" className="w-full" loading={isSubmitting}>
              Create Account
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
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium underline-offset-4 hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
