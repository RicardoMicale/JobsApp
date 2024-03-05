import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { SendIcon, XIcon } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Job } from '@/models/models';
import { useUser } from '@/hooks/useUser';
import { useToast } from '../ui/use-toast';
import { createApplication } from '@/firebase/queries';

interface ApplicationModalProps {
  job: Job;
}

export default function ApplicationModal({ job }: ApplicationModalProps) {
  const [user] = useUser();
  const { toast } = useToast();
  const [clickable, setClickable] = React.useState(true);

  const sendApplication = async () => {
    try {
      //  prevents double clicking
      if (!clickable) return;
      setClickable(false);

      const application = { job, candidate: user };

      const app = await createApplication(application);

      if (app) {
        toast({
          title: 'Aplicación creada con éxito',
        });
      } else {
        toast({
          title: 'Error!',
          description: 'Ya enviaste una aplicación a este puesto anteriormente',
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error!',
        description:
          'Su aplicación no ha podido ser enviada. Intente nuevamente',
      });
    } finally {
      setClickable(true);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="gap-2">
          Aplicar
          <SendIcon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar aplicación</DialogTitle>
        </DialogHeader>
        <Separator className="my-1" />
        <section className="space-x-4">
          <DialogClose>
            <Button variant="destructive" className="gap-2">
              Cancelar <XIcon size={16} />
            </Button>
          </DialogClose>
          <Button className="gap-2" onClick={sendApplication}>
            Enviar <SendIcon size={16} />
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
}
