import { z } from 'zod';

export const metricCardSchema = z.object({
  title: z.string(),
  value: z.string(),
  change: z.string(),
  isPositive: z.boolean(),
  description: z.string(),
});

export const recentActivitySchema = z.object({
  id: z.string(),
  user: z.string(),
  email: z.string().email(),
  action: z.string(),
  amount: z.string(),
  status: z.enum(['Completed', 'Pending', 'Failed']),
  date: z.string(),
});

export const dashboardOverviewSchema = z.object({
  metrics: z.array(metricCardSchema),
  recentActivities: z.array(recentActivitySchema),
});

export type DashboardOverviewData = z.infer<typeof dashboardOverviewSchema>;
