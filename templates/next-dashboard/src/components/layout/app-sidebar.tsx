'use client';

import * as React from 'react';

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from 'lucide-react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui';
import type { NavItem, ProjectItem, Team } from '@/types/dashboard';

import { NavMain } from './nav-main';
import { NavProjects } from './nav-projects';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';

const sampleTeams: Team[] = [
  {
    name: 'Acme Inc',
    logo: GalleryVerticalEnd,
    plan: 'Enterprise',
  },
  {
    name: 'Acme Corp.',
    logo: AudioWaveform,
    plan: 'Startup',
  },
  {
    name: 'Evil Corp.',
    logo: Command,
    plan: 'Free',
  },
];

const sampleNavMain: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Playground',
    url: '/playground',
    icon: SquareTerminal,
    items: [
      {
        title: 'History',
        url: '/playground/history',
      },
      {
        title: 'Starred',
        url: '/playground/starred',
      },
      {
        title: 'Playground Settings',
        url: '/playground/settings',
      },
    ],
  },
  {
    title: 'Models',
    url: '/models',
    icon: Bot,
    items: [
      {
        title: 'Genesis',
        url: '/models/genesis',
      },
      {
        title: 'Explorer',
        url: '/models/explorer',
      },
      {
        title: 'Quantum',
        url: '/models/quantum',
      },
    ],
  },
  {
    title: 'Documentation',
    url: '/documentation',
    icon: BookOpen,
    items: [
      {
        title: 'Introduction',
        url: '/documentation/introduction',
      },
      {
        title: 'Get Started',
        url: '/documentation/get-started',
      },
      {
        title: 'Tutorials',
        url: '/documentation/tutorials',
      },
      {
        title: 'Changelog',
        url: '/documentation/changelog',
      },
    ],
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings2,
    items: [
      {
        title: 'General',
        url: '/settings',
      },
      {
        title: 'Team',
        url: '/settings/team',
      },
      {
        title: 'Billing',
        url: '/settings/billing',
      },
    ],
  },
];

const sampleProjects: ProjectItem[] = [
  {
    name: 'Design Engineering',
    url: '/projects/design',
    icon: Frame,
  },
  {
    name: 'Sales & Marketing',
    url: '/projects/marketing',
    icon: PieChart,
  },
  {
    name: 'Travel & Logistics',
    url: '/projects/travel',
    icon: Map,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sampleTeams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sampleNavMain} />
        <NavProjects projects={sampleProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
