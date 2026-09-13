'use client';

import * as React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Bell, Search } from 'lucide-react';

import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Input,
  Separator,
  SidebarTrigger,
} from '@/components/ui';
import { useDashboardStore } from '@/stores';

export function Header() {
  const pathname = usePathname();
  const { unreadNotifications, markNotificationsAsRead } = useDashboardStore();

  const getBreadcrumbTitle = () => {
    if (pathname === '/') return 'Overview';
    if (pathname === '/settings') return 'Settings';
    if (pathname === '/analytics') return 'Analytics';
    return pathname.replace('/', '').replace(/-/g, ' ');
  };

  return (
    <header className="bg-background/95 sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b px-4 backdrop-blur-xs transition-[width,height] ease-linear">
      <div className="flex flex-1 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink render={<Link href="/" />}>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">{getBreadcrumbTitle()}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden w-48 md:block lg:w-64">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input type="search" placeholder="Search dashboard..." className="bg-muted/50 h-9 w-full pl-8 text-xs" />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8"
          onClick={markNotificationsAsRead}
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadNotifications > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full p-0 text-[10px]"
            >
              {unreadNotifications}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
}
