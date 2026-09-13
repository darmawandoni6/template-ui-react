import { useDashboardStore } from '@/stores/use-dashboard-store';

describe('useDashboardStore', () => {
  beforeEach(() => {
    useDashboardStore.setState({
      activeTeam: 'Acme Inc',
      unreadNotifications: 3,
      dateRange: '30d',
    });
  });

  it('initializes with default values', () => {
    expect(useDashboardStore.getState().activeTeam).toBe('Acme Inc');
    expect(useDashboardStore.getState().unreadNotifications).toBe(3);
    expect(useDashboardStore.getState().dateRange).toBe('30d');
  });

  it('updates active team', () => {
    useDashboardStore.getState().setActiveTeam('Evil Corp.');
    expect(useDashboardStore.getState().activeTeam).toBe('Evil Corp.');
  });

  it('marks notifications as read', () => {
    useDashboardStore.getState().markNotificationsAsRead();
    expect(useDashboardStore.getState().unreadNotifications).toBe(0);
  });

  it('updates date range filter', () => {
    useDashboardStore.getState().setDateRange('7d');
    expect(useDashboardStore.getState().dateRange).toBe('7d');
  });
});
