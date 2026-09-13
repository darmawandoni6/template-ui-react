import type { ComponentType } from 'react';

export interface Team {
  name: string;
  logo: ComponentType<{ className?: string }>;
  plan: string;
}

export interface NavItem {
  title: string;
  url: string;
  icon?: ComponentType<{ className?: string }>;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export interface ProjectItem {
  name: string;
  url: string;
  icon: ComponentType<{ className?: string }>;
}

export interface MetricCardData {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  description: string;
}

export interface RecentActivityItem {
  id: string;
  user: string;
  email: string;
  action: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
}
