import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { User } from '@/models/models';
import { Separator } from '../ui/separator';

interface RegisterFormProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export default function RegisterForm({
  user,
  setUser,
  password,
  setPassword,
}: RegisterFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrarse</CardTitle>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <form className="flex flex-col items-center justify-start gap-4">
          <section className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-1/2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                id="firstName"
                placeholder="Escribe tu nombre..."
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </div>
            <div className="w-full md:w-1/2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                placeholder="Escribe tu apellido..."
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </div>
          </section>
          <section className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-1/2">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                placeholder="Escribe tu correo electrónico..."
                type="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="w-full md:w-1/2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </section>
          <section className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-1/2">
              <Label htmlFor="location">País</Label>
              <Input
                id="location"
                placeholder="Donde te ubicas..."
                onChange={(e) => setUser({ ...user, location: e.target.value })}
              />
            </div>
          </section>
        </form>
      </CardContent>
    </Card>
  );
}
