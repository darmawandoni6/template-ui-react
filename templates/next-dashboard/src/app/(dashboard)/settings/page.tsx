'use client';

import * as React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, User } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  ErrorForm,
  Input,
  Label,
  Separator,
} from '@/components/ui';
import { useAuthStore } from '@/stores';
import { type ProfileSettingsInput, profileSettingsSchema } from '@/validators/settings.schema';

export default function SettingsPage() {
  const { user, setUser } = useAuthStore();
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSettingsInput>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      fullName: user?.name || 'Doni Darmawan',
      email: user?.email || 'doni@example.com',
      bio: 'Frontend engineer & UI designer building clean scalable React architectures.',
      notifications: true,
      theme: 'system',
    },
  });

  const onSubmit = async (data: ProfileSettingsInput) => {
    // Simulate API update
    await new Promise(resolve => setTimeout(resolve, 800));

    if (user) {
      setUser({
        ...user,
        name: data.fullName,
        email: data.email,
      });
    }

    setSuccessMessage('Profile settings updated successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Settings</h2>
        <p className="text-muted-foreground text-sm">Manage your account preferences and profile information</p>
      </div>

      <Separator />

      {successMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-medium text-emerald-600">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="text-primary h-5 w-5" />
              <CardTitle>Profile Information</CardTitle>
            </div>
            <CardDescription>Update your public display name, email, and biography</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" error={!!errors.fullName} {...register('fullName')} />
                <ErrorForm error={errors.fullName?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" error={!!errors.email} {...register('email')} />
                <ErrorForm error={errors.email?.message} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                placeholder="Tell us a little bit about yourself"
                error={!!errors.bio}
                {...register('bio')}
              />
              <ErrorForm error={errors.bio?.message} />
            </div>

            <div className="space-y-2 pt-2">
              <Controller
                name="notifications"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="notifications"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    label="Email Notifications"
                    description="Receive email updates regarding new dashboard activity and metrics alerts."
                  />
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-4">
            <Button type="submit" loading={isSubmitting}>
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
