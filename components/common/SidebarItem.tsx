'use client';

import React from 'react';
import Link from 'next/link';
import { Route } from '@/models/models';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  route: Route;
}

export default function SidebarItem({ route }: SidebarItemProps) {
  const pathname = usePathname();

  return (
    <Link href={route?.href ?? '/'}>
      <span
        className={`w-full my-2 px-4 py-2 rounded-md text-lg flex items-center justify-start gap-2 ${
          pathname === route.href
            ? 'bg-primary/10 text-primary'
            : 'text-slate-500 hover:bg-muted'
        }`}
      >
        {route?.icon ?? ''}
        {route?.text ?? ''}
      </span>
    </Link>
  );
}
