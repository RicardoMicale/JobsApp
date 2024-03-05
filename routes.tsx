import {
  Briefcase,
  LucideClipboardCheck,
  LucideSettings,
  LucideUser2,
} from 'lucide-react';
import { Route } from './models/models';

export const routes: Route[] = [
  {
    text: 'Trabajos',
    href: '/app/jobs',
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    text: 'Aplicaciones',
    href: '/app/applications',
    icon: <LucideClipboardCheck className="h-5 w-5" />,
    permissions: ['candidate'],
  },
  {
    text: 'Puestos',
    href: '/app/positions',
    icon: <LucideClipboardCheck className="h-5 w-5" />,
    permissions: ['recruiter'],
  },
  {
    text: 'Perfil',
    href: '/app/profile',
    icon: <LucideUser2 className="h-5 w-5" />,
  },
];
