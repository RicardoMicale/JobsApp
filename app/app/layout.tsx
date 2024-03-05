'use client';

import Sidebar from '@/components/common/Sidebar';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/hooks/useUser';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [user] = useUser();
  const { toast } = useToast();
  const router = useRouter();

  if (!user) {
    //  if there is no user signed in, redirects to login page
    toast({
      title: 'No has iniciado sesión!',
      description: 'Debes ingresar con tu cuenta o registrarte!',
      action: (
        <ToastAction altText="Close toast">
          <XIcon size={16} />
        </ToastAction>
      ),
    });
    router.push('/auth/login');
  }

  return (
    <div className="flex items-start justify-start h-screen overflow-hidden">
      <Sidebar />
      <section className="px-10 py-8 w-full h-full overflow-auto">
        {children}
      </section>
    </div>
  );
}
