'use client';

import React from 'react';
import { routes } from '@/routes';
import SidebarItem from './SidebarItem';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { signOut } from '@/firebase/auth';
import { useUser } from '@/hooks/useUser';

export default function Sidebar() {
  const { toast } = useToast();
  const router = useRouter();
  const [user] = useUser();
  const _routes = routes.filter(
    (route) => route.permissions?.includes(user?.role ?? '') ?? true
  );

  const logout = () => {
    try {
      //  shows a toast to display info
      toast({
        title: 'Cesión cerrada con éxito',
      });
      //  logs out
      signOut();
      //  redirects to landing page
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-background max-w-sm h-full flex flex-col items-center justify-between pb-8">
      <div>
        <header className="py-8 w-full flex justify-center items-center border-b-muted border-b-2">
          <Link href="/" className="font-bold text-xl text-foreground">
            <span className="text-primary">J</span>obs
          </Link>
        </header>
        <section className="w-full px-4 py-4">
          {_routes.map((route, index) => (
            <SidebarItem key={index} route={route} />
          ))}
        </section>
      </div>
      <Button className="gap-2" onClick={logout}>
        Cerrar sesión <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
}
