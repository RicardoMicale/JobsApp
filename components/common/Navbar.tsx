'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Edit2Icon, LogOut } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { signOut } from '@/firebase/auth';
import { useToast } from '../ui/use-toast';

export default function Navbar() {
  const [user] = useUser();
  const { toast } = useToast();
  const router = useRouter();

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
    <div className="flex items-center justify-between py-4 px-10">
      <Link href="/" className="font-bold text-foreground">
        <span className="text-primary">J</span>obs
      </Link>
      {user ? (
        <section className="flex items-center justify-end gap-4">
          <Link href="/auth/sign-in" className="text-muted-foreground">
            Iniciar sesión
          </Link>
          <Button asChild className="gap-2">
            <Link href="/auth/register">
              <Edit2Icon className="w-4 h-4" />
              Registrarse
            </Link>
          </Button>
        </section>
      ) : (
        <section>
          <Button asChild className="gap-2" onClick={logout}>
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </Button>
        </section>
      )}
    </div>
  );
}
