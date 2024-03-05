'use client';

import React from 'react';
import RegisterForm from './RegisterForm';
import UserTypeForm from './UserTypeForm';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Check, XIcon } from 'lucide-react';
import Navbar from '../common/Navbar';
import { User } from '@/models/models';
import { useUser } from '@/hooks/useUser';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { register } from '@/firebase/auth';
import { emailValidation } from '@/lib/functions';
import { ToastAction } from '../ui/toast';

export default function Register() {
  const { toast } = useToast();
  const router = useRouter();
  //  user from the user context
  const [, setUser] = useUser();
  //  user object to register
  const [newUser, setNewUser] = React.useState<User>({});
  const [password, setPassword] = React.useState('');
  //  helper state
  const [clickable, setClickable] = React.useState(true);

  //  handles user creation
  const handleRegister = async () => {
    try {
      //prevents double clicking
      if (!clickable) return;
      setClickable(false);

      //  validates email
      if (!emailValidation(newUser?.email ?? '')) {
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

      //  validates first name
      if (!newUser?.firstName) {
        toast({
          title: 'Ingresa un nombre!',
          action: (
            <ToastAction altText="Close toast">
              <XIcon size={16} />
            </ToastAction>
          ),
        });
        return;
      }

      // validates last name
      if (!newUser?.lastName) {
        toast({
          title: 'Ingresa un nombre!',
          action: (
            <ToastAction altText="Close toast">
              <XIcon size={16} />
            </ToastAction>
          ),
        });
        return;
      }

      //  validates the role
      if (!newUser?.role) {
        toast({
          title: 'Por favor seleccione si es candidato o reclutador.',
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

      //  registers the user on firebase
      const _user = await register(newUser, password);

      if (_user) {
        //  sets the user in the context
        if (setUser) setUser({ ...(_user ?? {}) });
        //  notifies success
        toast({
          title: 'Usuario registrado con éxito!',
          action: (
            <ToastAction altText="Close toast">
              <XIcon size={16} />
            </ToastAction>
          ),
        });
        //  redirects to profile page
        router.push('/app/profile');
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
      <div className="py-20 px-10">
        <section className="flex flex-col gap-8">
          <RegisterForm
            user={newUser}
            setUser={setNewUser}
            password={password}
            setPassword={setPassword}
          />
          <UserTypeForm user={newUser} setUser={setNewUser} />
        </section>
        <section className="flex flex-col md:flex-row gap-6 items-center justify-between mt-6">
          <p className="text-muted-foreground text-base md:text-sm">
            Ya tienes cuenta? Haz click{' '}
            <span className="text-primary underline">
              <Link href="/auth/sign-in">aquí</Link>
            </span>{' '}
            para iniciar sesión
          </p>
          <Button
            className="gap-2"
            onClick={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            Registrarse <Check className="h-4 w-4" />
          </Button>
        </section>
      </div>
    </section>
  );
}
