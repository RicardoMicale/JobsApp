import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Job } from '@/models/models';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { ToastAction } from '../ui/toast';
import { XIcon } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { getImage, uploadImage } from '@/firebase/queries';

interface CreateJobFormProps {
  newJob: Job;
  setNewJob: React.Dispatch<React.SetStateAction<Job>>;
}

export default function CreateJobForm({
  newJob,
  setNewJob,
}: CreateJobFormProps) {
  const [isRemote, setIsRemote] = React.useState(newJob?.remote ?? false);

  const { toast } = useToast();
  const [photo, setPhoto] = React.useState<File>();
  const [clickable, setClickable] = React.useState(true);

  const handleUpload = async () => {
    try {
      const acceptedFiles = ['.jpg', '.jpeg', '.png'];
      //  prevents double clicking
      if (!clickable) return;
      setClickable(false);

      const path = `${newJob?._id}/${photo?.name}`;

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

      setNewJob({ ...newJob, photo: photoURL ?? undefined });
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
    <form className="flex flex-col items-start justify-start gap-4">
      <section className="w-full flex flex-col items-start justify-center gap-3">
        <div className="w-full">
          <Label htmlFor="logo">Logo de la compañía</Label>
          <Input
            id="logo"
            type="file"
            onChange={(e) => {
              e.preventDefault();
              if (!e.target.files) return;

              setPhoto(e.target.files[0]);
            }}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={newJob?.title ?? ''}
            placeholder="Qué título tiene este puesto"
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="salary">Salario anual</Label>
          <Input
            id="salary"
            type="number"
            value={newJob?.salary ?? undefined}
            placeholder="Qué compensación tiene este puesto"
            onChange={(e) =>
              setNewJob({ ...newJob, salary: e.target.valueAsNumber })
            }
          />
        </div>
      </section>

      {!isRemote && (
        <section className="w-full flex flex-col items-start justify-center gap-3">
          <div className="w-full">
            <Label htmlFor="country">País</Label>
            <Input
              id="country"
              value={newJob?.country ?? ''}
              placeholder="En qué país está localizado este puesto"
              onChange={(e) =>
                setNewJob({ ...newJob, country: e.target.value })
              }
            />
          </div>
          <div className="w-full">
            <Label htmlFor="city">Ciudad</Label>
            <Input
              id="city"
              placeholder="En qué ciudad está localizado el puesto"
              value={newJob?.city ?? ''}
              onChange={(e) => setNewJob({ ...newJob, city: e.target.value })}
            />
          </div>
        </section>
      )}

      <div className="flex items-center justify-start gap-2">
        <Checkbox
          id="remote"
          checked={newJob?.remote ?? false}
          onCheckedChange={(e) => {
            setIsRemote(!isRemote);
            setNewJob({ ...newJob, remote: e ? true : false });
          }}
        />
        <Label htmlFor="remote">Remoto</Label>
      </div>
    </form>
  );
}
