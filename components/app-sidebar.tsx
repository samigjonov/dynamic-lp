'use client';

import * as React from 'react';
import { Command, SquareTerminal } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const data = {
  navMain: [
    {
      title: 'Dashboard Management',
      url: '/dashboard',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Navbar',
          url: '/dashboard/navbar',
        },
        {
          title: 'Hero',
          url: '/dashboard/hero',
        },
        {
          title: 'About Us',
          url: '/dashboard/about',
        },
        {
          title: 'Features',
          url: '/dashboard/features',
        },
        {
          title: 'Testimonials',
          url: '/dashboard/testimonials',
        },
        {
          title: 'FAQs',
          url: '/dashboard/faqs',
        },
        {
          title: 'Contact submissions',
          url: '/dashboard/contact-submissions',
        },
        {
          title: 'Footer',
          url: '/dashboard/footer',
        },
      ],
    },
  ],
};

type AppSidebarProps = { email?: string } & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ email, ...props }: AppSidebarProps) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Learning Centre</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      {email && (
        <SidebarFooter>
          <NavUser email={email} />
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
