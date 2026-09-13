import { z } from 'zod';

export const profileSettingsSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(160, 'Bio must be under 160 characters').optional(),
  notifications: z.boolean().default(true),
  theme: z.enum(['light', 'dark', 'system']).default('system'),
});

export type ProfileSettingsInput = z.infer<typeof profileSettingsSchema>;
