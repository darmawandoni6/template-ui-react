'use client';

import * as React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ChevronRight } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui';
import type { NavItem } from '@/types/dashboard';

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    items.forEach(item => {
      if (item.items && item.items.length > 0) {
        // Initially hide all submenus unless the current active route matches a sub-item
        initial[item.title] = item.items.some(sub => pathname === sub.url);
      }
    });
    return initial;
  });

  // Keep open submenus in sync if pathname changes to a submenu route
  React.useEffect(() => {
    items.forEach(item => {
      if (item.items && item.items.length > 0) {
        if (item.items.some(sub => pathname === sub.url)) {
          setOpenItems(prev => ({ ...prev, [item.title]: true }));
        }
      }
    });
  }, [pathname, items]);

  const toggleItem = (title: string) => {
    setOpenItems(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => {
          const isOpen = openItems[item.title] ?? false;
          const hasSubItems = item.items && item.items.length > 0;
          const isActive = pathname === item.url || (hasSubItems && item.items?.some(sub => pathname === sub.url));

          return (
            <SidebarMenuItem key={item.title}>
              {hasSubItems ? (
                <>
                  <SidebarMenuButton
                    onClick={() => toggleItem(item.title)}
                    isActive={isActive}
                    className="w-full justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {item.icon && <item.icon className="size-4" />}
                      <span>{item.title}</span>
                    </div>
                    <ChevronRight className={`size-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                  </SidebarMenuButton>
                  {isOpen && (
                    <SidebarMenuSub>
                      {item.items?.map(subItem => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            render={<Link href={subItem.url} />}
                            isActive={pathname === subItem.url}
                          >
                            <span>{subItem.title}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </>
              ) : (
                <SidebarMenuButton render={<Link href={item.url} />} isActive={pathname === item.url}>
                  {item.icon && <item.icon className="size-4" />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
