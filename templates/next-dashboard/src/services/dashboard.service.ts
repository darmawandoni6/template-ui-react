import { http } from '@/lib/axios';
import { type DashboardOverviewData, dashboardOverviewSchema } from '@/validators/dashboard.schema';

export const dashboardService = {
  async getOverview(): Promise<DashboardOverviewData> {
    const mockData: DashboardOverviewData = {
      metrics: [
        {
          title: 'Total Revenue',
          value: '$45,231.89',
          change: '+20.1% from last month',
          isPositive: true,
          description: 'Total earnings after fee deduction',
        },
        {
          title: 'Subscriptions',
          value: '+2,350',
          change: '+180.1% from last month',
          isPositive: true,
          description: 'Active recurring subscribers',
        },
        {
          title: 'Sales',
          value: '+12,234',
          change: '+19% from last month',
          isPositive: true,
          description: 'Total completed transactions',
        },
        {
          title: 'Active Now',
          value: '+573',
          change: '+201 since last hour',
          isPositive: true,
          description: 'Live active users right now',
        },
      ],
      recentActivities: [
        {
          id: 'INV-001',
          user: 'Olivia Martin',
          email: 'olivia.martin@email.com',
          action: 'Purchased Pro Plan',
          amount: '+$1,999.00',
          status: 'Completed',
          date: 'Just now',
        },
        {
          id: 'INV-002',
          user: 'Jackson Lee',
          email: 'jackson.lee@email.com',
          action: 'Subscribed to Enterprise',
          amount: '+$39.00',
          status: 'Pending',
          date: '2 hours ago',
        },
        {
          id: 'INV-003',
          user: 'Isabella Nguyen',
          email: 'isabella.nguyen@email.com',
          action: 'Purchased Annual License',
          amount: '+$299.00',
          status: 'Completed',
          date: '5 hours ago',
        },
        {
          id: 'INV-004',
          user: 'William Kim',
          email: 'will@email.com',
          action: 'Failed Payment Retry',
          amount: '+$99.00',
          status: 'Failed',
          date: '1 day ago',
        },
        {
          id: 'INV-005',
          user: 'Sofia Davis',
          email: 'sofia.davis@email.com',
          action: 'Renewed Team Subscription',
          amount: '+$39.00',
          status: 'Completed',
          date: '2 days ago',
        },
      ],
    };

    try {
      const response = await http.get<DashboardOverviewData>('/analytics');
      return dashboardOverviewSchema.parse(response.data);
    } catch {
      // Fallback to validated mock data
      return dashboardOverviewSchema.parse(mockData);
    }
  },
};
