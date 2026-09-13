'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Folder, Forward, MoreHorizontal, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui';
import type { ProjectItem } from '@/types/dashboard';

export function NavProjects({ projects }: { projects: ProjectItem[] }) {
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map(item => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton render={<Link href={item.url} />} isActive={pathname === item.url}>
              <item.icon className="size-4" />
              <span>{item.name}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-1.5 right-1 flex size-6 cursor-pointer items-center justify-center rounded-md p-0 opacity-0 group-hover/menu-item:opacity-100"
                    aria-label="More"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                }
              />
              <DropdownMenuContent
                className="w-48 rounded-xl"
                side={isMobile ? 'bottom' : 'right'}
                align={isMobile ? 'end' : 'start'}
              >
                <DropdownMenuItem className="gap-2">
                  <Folder className="text-muted-foreground size-4" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Forward className="text-muted-foreground size-4" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive gap-2">
                  <Trash2 className="text-destructive size-4" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
