import React from 'react';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { PlusIcon, XIcon } from 'lucide-react';
import { Badge } from '../ui/badge';

interface JobResponsibilitiesFormProps {
  responsibility: string;
  setResponsibility: React.Dispatch<React.SetStateAction<string>>;
  responsibilities: string[];
  setResponsibilities: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function JobResponsibilitiesForm({
  responsibility,
  setResponsibility,
  responsibilities,
  setResponsibilities,
}: JobResponsibilitiesFormProps) {
  return (
    <div>
      <div className="mb-4">
        <Label htmlFor="requirements">Responsabilidades</Label>
        <div className="my-2 flex items-center justify-start gap-1 flex-wrap">
          {responsibilities.map((req) => (
            <Badge variant="secondary" key={req} className="gap-2">
              {req}
              <button
                onClick={() => {
                  const resp = responsibilities;
                  const index = resp.indexOf(req);
                  resp.splice(index, 1);
                  setResponsibilities([...resp]);
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
            placeholder="Qué responsabilidades tiene el puesto"
            onChange={(e) => setResponsibility(e.target.value)}
          />
          <Button
            variant="outline"
            onClick={() => {
              if (!responsibility) return;
              if (responsibilities.includes(responsibility)) return;
              setResponsibilities([...responsibilities, responsibility]);
              setResponsibility('');
            }}
          >
            <PlusIcon size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
