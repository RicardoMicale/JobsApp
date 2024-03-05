import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';

interface SignInFormProps {
  signInData: { email: string; password: string };
  setSignInData: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >;
}

export default function SignInForm({
  signInData,
  setSignInData,
}: SignInFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Iniciar sesión</CardTitle>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <form className="flex flex-col items-center justify-start gap-4">
          <section className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-1/2">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                placeholder="email@ejemplo.com"
                type="email"
                onChange={(e) =>
                  setSignInData({ ...signInData, email: e.target.value })
                }
              />
            </div>
            <div className="w-full md:w-1/2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) =>
                  setSignInData({ ...signInData, password: e.target.value })
                }
              />
            </div>
          </section>
        </form>
      </CardContent>
    </Card>
  );
}
