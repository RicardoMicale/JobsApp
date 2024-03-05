'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { User } from '@/models/models';
import { UserCircle2Icon, XIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '../ui/toast';
import { getImage, uploadImage } from '@/firebase/queries';
import { Separator } from '../ui/separator';

interface UserFormProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  edit: boolean;
}

export default function UserForm({ user, setUser, edit }: UserFormProps) {
  const { toast } = useToast();
  const [photo, setPhoto] = React.useState<File>();
  const [clickable, setClickable] = React.useState(true);

  const handleUpload = async () => {
    try {
      const acceptedFiles = ['.jpg', '.jpeg', '.png'];
      //  prevents double clicking
      if (!clickable) return;
      setClickable(false);

      const path = `${user?._id}/${photo?.name}`;

      let res;
      let photoURL;

      if (photo) {
        if (!acceptedFiles.includes(photo.type)) {
          toast({
            title: 'Este tipo de archivo no se acepta.',
            description: `Por favor, suba un archivo con los siguientes formatos: ${acceptedFiles.join(
              ','
            )}`,
            action: (
              <ToastAction altText="Close toast">
                <XIcon size={16} />
              </ToastAction>
            ),
          });
        }
        res = await uploadImage(path, photo);
        toast({
          title: 'Imagen cargada exitosamente.',
          action: (
            <ToastAction altText="Close toast">
              <XIcon size={16} />
            </ToastAction>
          ),
        });
      }

      if (res) {
        photoURL = await getImage(res.ref.fullPath);
      }

      setUser({ ...user, photo: photoURL ?? undefined });
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
    handleUpload();
  }, [photo, setPhoto]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información general</CardTitle>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <form className="flex flex-col items-center justify-start gap-4">
          <section className="w-full flex flex-col md:flex-row items-center justify-start gap-4">
            {user?.photo ? (
              <Avatar>
                <AvatarImage src={user?.photo ?? ''} alt={user?.email ?? ''} />
                <AvatarFallback>{`${user?.firstName} ${user?.lastName}`}</AvatarFallback>
              </Avatar>
            ) : (
              <UserCircle2Icon size={48} />
            )}
            <div className="w-full md:w-1/2">
              <Label htmlFor="firstName">Foto de perfil</Label>
              <Input
                id="firstName"
                type="file"
                disabled={!edit}
                onChange={(e) => {
                  e.preventDefault();
                  if (!e.target.files) return;

                  setPhoto(e.target.files[0]);
                }}
              />
            </div>
          </section>
          <section className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-1/2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                id="firstName"
                disabled={!edit}
                value={user?.firstName ?? ''}
                onChange={(e) => {
                  setUser({ ...user, firstName: e.target.value });
                }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                disabled={!edit}
                value={user?.lastName ?? ''}
                onChange={(e) => {
                  setUser({ ...user, lastName: e.target.value });
                }}
              />
            </div>
          </section>
          <section className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-1/2">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                disabled={!edit}
                value={user?.email ?? ''}
                type="email"
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <Label htmlFor="location">País</Label>
              <Input
                id="location"
                disabled={!edit}
                value={user?.location ?? ''}
                onChange={(e) => {
                  setUser({ ...user, location: e.target.value });
                }}
              />
            </div>
          </section>
          <section className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
            {user?.role === 'recruiter' && (
              <div className="w-full md:w-1/2">
                <Label htmlFor="company">Compañía</Label>
                <Input
                  id="company"
                  disabled={!edit}
                  value={user?.companyName ?? ''}
                  onChange={(e) => {
                    setUser({ ...user, companyName: e.target.value });
                  }}
                />
              </div>
            )}
            <div className="w-full md:w-1/2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                disabled={!edit}
                value={user?.title ?? ''}
                onChange={(e) => {
                  setUser({ ...user, title: e.target.value });
                }}
              />
            </div>
          </section>
        </form>
      </CardContent>
    </Card>
  );
}
