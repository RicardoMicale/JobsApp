import { Job } from '@/models/models';
import React from 'react';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { PlusIcon, XIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface JobRequirementsFormProps {
  requirement: string;
  setRequirement: React.Dispatch<React.SetStateAction<string>>;
  requirements: string[];
  setRequirements: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function JobRequirementsForm({
  requirement,
  setRequirement,
  requirements,
  setRequirements,
}: JobRequirementsFormProps) {
  return (
    <div>
      <div className="mb-4">
        <Label htmlFor="requirements">Requisitos</Label>
        <div className="my-2 flex items-center justify-start gap-1 flex-wrap">
          {requirements.map((req) => (
            <Badge variant="secondary" key={req} className="gap-2">
              {req}
              <button
                onClick={() => {
                  const reqs = requirements;
                  const index = reqs.indexOf(req);
                  reqs.splice(index, 1);
                  setRequirements([...reqs]);
                }}
              >
                <XIcon size={12} />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-start gap-2">
          <Input
            id="requirements"
            placeholder="Qué requisitos tiene el puesto"
            onChange={(e) => setRequirement(e.target.value)}
          />
          <Button
            variant="outline"
            onClick={() => {
              if (!requirement) return;
              if (requirements.includes(requirement)) return;
              setRequirements([...requirements, requirement]);
              setRequirement('');
            }}
          >
            <PlusIcon size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
