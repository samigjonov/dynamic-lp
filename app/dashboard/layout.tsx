'use client';

import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

function generateBreadcrumbs(pathname: string) {
  // Remove leading slash and split into segments
  const segments = pathname.slice(1).split('/');

  // Filter out 'dashboard' as it's our root
  const paths = segments.filter((segment) => segment !== 'dashboard');

  return paths.map((path, index) => {
    // Format the path for display (capitalize and replace hyphens)
    const displayName = path
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Calculate the href for this breadcrumb
    const href = '/' + segments.slice(0, index + 2).join('/');

    return {
      href,
      displayName,
      isLast: index === paths.length - 1,
    };
  });
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.map((breadcrumb, index) => (
                  <Fragment key={index}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem key={breadcrumb.href}>
                      {breadcrumb.isLast ? (
                        <BreadcrumbPage>{breadcrumb.displayName}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={breadcrumb.href}>
                          {breadcrumb.displayName}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
