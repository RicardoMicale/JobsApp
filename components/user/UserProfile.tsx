'use client';

import React from 'react';
import UserForm from './UserForm';
import { useUser } from '@/hooks/useUser';
import { User } from '@/models/models';
import { Button } from '../ui/button';
import { CheckIcon, EditIcon, XIcon } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '../ui/toast';
import { updateUser } from '@/firebase/queries';

export default function UserProfile() {
  const { toast } = useToast();
  const [user] = useUser();

  const [currentUser, setCurrentUser] = React.useState<User>({});
  const [edit, setEdit] = React.useState(false);
  const [clickable, setClickable] = React.useState(true);

  const handleUpdate = async () => {
    try {
      //  prevents double clicking
      if (!clickable) return;
      setClickable(false);
      console.log(currentUser);

      const updatedUser = await updateUser(currentUser, user?._id ?? '');

      if (updatedUser) {
        toast({
          title: 'Datos actualizados exitosamente.',
          action: (
            <ToastAction altText="Close toast">
              <XIcon size={16} />
            </ToastAction>
          ),
        });
        setEdit(false);
      }
    } catch (err) {
      console.log(err);
      toast({
        title: 'Ocurrió un error.',
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

  React.useEffect(() => {
    if (user) setCurrentUser(user);
  }, [user]);

  return (
    <section>
      <UserForm user={currentUser} setUser={setCurrentUser} edit={edit} />
      {edit ? (
        <div className="flex items-center justify-end gap-4 mt-4">
          <Button
            variant="destructive"
            className="gap-2"
            onClick={() => setEdit(false)}
          >
            Cancelar
            <XIcon size={16} />
          </Button>
          <Button className="gap-2" onClick={handleUpdate}>
            Guardar
            <CheckIcon size={16} />
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          className="gap-2 mt-4"
          onClick={() => setEdit(true)}
        >
          Editar <EditIcon size={16} />
        </Button>
      )}
    </section>
  );
}
