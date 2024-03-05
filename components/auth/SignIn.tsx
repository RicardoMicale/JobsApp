'use client';

import React from 'react';
import SignInForm from './SignInForm';
import Link from 'next/link';
import { Button } from '../ui/button';
import { LogIn, Trash2Icon, XIcon } from 'lucide-react';
import Navbar from '../common/Navbar';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { emailValidation } from '@/lib/functions';
import { singIn } from '@/firebase/auth';
import { ToastAction } from '../ui/toast';

export default function SignIn() {
  const { toast } = useToast();
  const router = useRouter();
  //  user from the user context
  const [, setUser] = useUser();
  //  sign in data state
  const [signInData, setSignInData] = React.useState<{
    email: string;
    password: string;
  }>({ email: '', password: '' });
  //  helper state
  const [clickable, setClickable] = React.useState(true);

  //  handles sign in
  const login = async () => {
    try {
      const { email, password } = signInData;

      //prevents double clicking
      if (!clickable) return;
      setClickable(false);

      //  validates email
      if (!emailValidation(email ?? '')) {
        toast({
          title: 'Ingresa un email válido!',
          action: (
            <ToastAction altText="Close toast">
              <XIcon size={16} />
            </ToastAction>
          ),
        });
        return;
      }

      //  validates password
      if (!password) {
        toast({
          title: 'La contraseña no puede estar vacía!',
          action: (
            <ToastAction altText="Close toast">
              <XIcon size={16} />
            </ToastAction>
          ),
        });
        return;
      }

      //  signs the user in
      const _user = await singIn(email, password);

      if (_user) {
        if (setUser) setUser({ ..._user.data() });
        toast({
          title: 'Sesión iniciada con éxito!',
          action: (
            <ToastAction altText="Close toast">
              <XIcon size={16} />
            </ToastAction>
          ),
        });
        router.push('/app/profile');
      } else {
        toast({
          title: 'Usuario no encontrado. Por favor registrarse',
          action: (
            <ToastAction altText="Close toast">
              <XIcon size={16} />
            </ToastAction>
          ),
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: 'Ocurrió un error!',
        action: (
          <ToastAction altText="Close toast">
            <XIcon size={16} />
          </ToastAction>
        ),
      });
    } finally {
      setClickable(true);
    }
  };

  return (
    <section>
      <Navbar />
      <div className="py-36 px-10">
        <SignInForm signInData={signInData} setSignInData={setSignInData} />
        <section className="flex flex-col md:flex-row gap-6 items-center justify-between mt-6">
          <p className="text-muted-foreground text-base md:text-sm">
            No tienes cuenta? Haz click{' '}
            <span className="text-primary underline">
              <Link href="/auth/sign-in">aquí</Link>
            </span>{' '}
            para registrarte
          </p>
          <Button
            className="gap-2"
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          >
            Iniciar sesión <LogIn className="h-4 w-4" />
          </Button>
        </section>
      </div>
    </section>
  );
}
