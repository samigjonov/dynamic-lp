'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';

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

export function Breadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);
  return (
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
                <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.displayName}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
