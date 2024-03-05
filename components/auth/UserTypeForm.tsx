import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { User } from '@/models/models';
import { Separator } from '../ui/separator';

interface UserTypeFormProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export default function UserTypeForm({ user, setUser }: UserTypeFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buscas trabajo o empleados</CardTitle>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <section className="flex items-center justify-start gap-4">
          <div className="flex items-center justify-start gap-2">
            <Checkbox
              id="applicant"
              checked={user.role === 'candidate'}
              onCheckedChange={(e) => {
                setUser({ ...user, role: e ? 'candidate' : undefined });
              }}
            />
            <Label htmlFor="applicant">Candidato</Label>
          </div>
          <div className="flex items-center justify-start gap-2">
            <Checkbox
              id="recruiter"
              checked={user.role === 'recruiter'}
              onCheckedChange={(e) => {
                setUser({ ...user, role: e ? 'recruiter' : undefined });
              }}
            />
            <Label htmlFor="recruiter">Reclutador</Label>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
