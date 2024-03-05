'use client';

import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import {
  ArrowLeft,
  ArrowRight,
  CheckIcon,
  PlusIcon,
  XIcon,
} from 'lucide-react';
import { Separator } from '../ui/separator';
import CreateJobForm from './CreateJobForm';
import { Job } from '@/models/models';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '../ui/toast';
import { validateJob } from '@/lib/functions';
import { createJob } from '@/firebase/queries';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { useUser } from '@/hooks/useUser';
import JobRequirementsForm from './JobRequirementsForm';
import JobResponsibilitiesForm from './JobResponsibilitiesForm';

export default function JobModal() {
  const [user] = useUser();
  const { toast } = useToast();
  const [newJob, setNewJob] = React.useState<Job>({});
  const [clickable, setClickable] = React.useState(true);
  const [step, setStep] = React.useState(0);

  //  tag states
  const [tags, setTags] = React.useState<string[]>([]);
  const [tag, setTag] = React.useState('');

  //  requirement states
  const [requirements, setRequirements] = React.useState<string[]>([]);
  const [requirement, setRequirement] = React.useState('');

  //  responsibilities states
  const [responsibility, setResponsibility] = React.useState<string>('');
  const [responsibilities, setResponsibilities] = React.useState<string[]>([]);

  const handleCreateJob = async () => {
    try {
      //  prevents double clicking
      if (!clickable) return;
      setClickable(false);

      const [validJob, error] = validateJob(newJob);

      if (!validJob) {
        toast({
          title: 'Ocurrió un error',
          description: `${error}`,
          action: (
            <ToastAction altText="Close toast">
              <XIcon size={16} />
            </ToastAction>
          ),
        });
      }

      const _job = await createJob({
        ...newJob,
        photo: newJob?.photo ?? '',
        tags,
        requirements,
        responsibilities,
        recruiter: user,
      });

      if (_job) {
        toast({
          title: 'Puesto creado exitosamente',
          action: (
            <ToastAction altText="Close toast">
              <XIcon size={16} />
            </ToastAction>
          ),
        });
        cancel();
      }
    } catch (err) {
      console.log(err);
      toast({
        title: 'Ocurrió un error',
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

  const cancel = () => {
    setNewJob({});
    setStep(0);
    setTags([]);
    setTag('');
    setResponsibilities([]);
    setResponsibility('');
    setRequirement('');
    setRequirements([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          Crear puesto <PlusIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear puesto</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />
        {step === 0 && <CreateJobForm newJob={newJob} setNewJob={setNewJob} />}
        {step === 1 && (
          <JobRequirementsForm
            requirement={requirement}
            setRequirement={setRequirement}
            requirements={requirements}
            setRequirements={setRequirements}
          />
        )}
        {step === 2 && (
          <JobResponsibilitiesForm
            responsibility={responsibility}
            setResponsibility={setResponsibility}
            responsibilities={responsibilities}
            setResponsibilities={setResponsibilities}
          />
        )}
        {step === 3 && (
          <section className="w-full">
            <div className="mb-4">
              <Label htmlFor="tags">Etiquetas</Label>
              <div className="my-2 flex items-center justify-start gap-1">
                {tags.map((tag) => (
                  <Badge variant="secondary" key={tag} className="gap-2">
                    {tag}
                    <button
                      onClick={() => {
                        const _tags = tags;
                        const index = _tags.indexOf(tag);
                        _tags.splice(index, 1);
                        setTags([..._tags]);
                      }}
                    >
                      <XIcon size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-start gap-2">
                <Input
                  id="tags"
                  placeholder="Qué características tiene el puesto"
                  onChange={(e) => setTag(e.target.value)}
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    if (!tag) return;
                    if (tags.includes(tag)) return;
                    setTags([...tags, tag]);
                    setTag('');
                  }}
                >
                  <PlusIcon size={16} />
                </Button>
              </div>
            </div>
            <Label htmlFor="description">Descripción del puesto</Label>
            <Textarea
              id="description"
              placeholder="En este puesto tus responsabilidades serán..."
              onChange={(e) =>
                setNewJob({ ...newJob, description: e.target.value })
              }
            />
          </section>
        )}
        <DialogFooter>
          {step === 0 && (
            <Button variant="outline" onClick={() => setStep(1)}>
              <ArrowRight size={16} />
            </Button>
          )}
          {step === 1 && (
            <div className="space-x-4">
              <Button variant="outline" onClick={() => setStep(0)}>
                <ArrowLeft size={16} />
              </Button>
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowRight size={16} />
              </Button>
            </div>
          )}
          {step === 2 && (
            <div className="space-x-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft size={16} />
              </Button>
              <Button variant="outline" onClick={() => setStep(3)}>
                <ArrowRight size={16} />
              </Button>
            </div>
          )}
          {step === 3 && (
            <div className="w-full flex items-center justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft size={16} />
              </Button>
              <div className="flex items-center justify-end gap-4">
                <DialogClose asChild>
                  <Button
                    className="gap-2"
                    variant="destructive"
                    onClick={cancel}
                  >
                    Cancelar <XIcon size={16} />
                  </Button>
                </DialogClose>
                <Button className="gap-2" onClick={handleCreateJob}>
                  Guardar <CheckIcon size={16} />
                </Button>
              </div>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
