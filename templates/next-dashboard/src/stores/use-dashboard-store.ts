import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface DashboardState {
  activeTeam: string;
  setActiveTeam: (team: string) => void;
  unreadNotifications: number;
  markNotificationsAsRead: () => void;
  dateRange: '7d' | '30d' | '90d' | '12m';
  setDateRange: (range: '7d' | '30d' | '90d' | '12m') => void;
}

export const useDashboardStore = create<DashboardState>()(
  devtools(
    set => ({
      activeTeam: 'Acme Inc',
      setActiveTeam: activeTeam => set({ activeTeam }, false, 'dashboard/setActiveTeam'),
      unreadNotifications: 3,
      markNotificationsAsRead: () => set({ unreadNotifications: 0 }, false, 'dashboard/markNotificationsAsRead'),
      dateRange: '30d',
      setDateRange: dateRange => set({ dateRange }, false, 'dashboard/setDateRange'),
    }),
    { name: 'dashboard-store' },
  ),
);
