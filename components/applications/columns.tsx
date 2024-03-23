'use client';

import { Application, Job, User } from '@/models/models';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import { DotIcon, Trash2Icon } from 'lucide-react';
import { disable } from './applicationFunctions';

dayjs.locale('es');

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: 'active',
    header: 'Estatus',
    cell: ({ row }) => {
      const status = row.getValue('active');
      return (
        <span
          className={`flex items-center justify-start ${
            status ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          <DotIcon size={32} />
          {status ? 'Activa' : 'Inactiva'}
        </span>
      );
    },
  },
  {
    accessorKey: 'job',
    header: 'Titulo del puesto',
    cell: ({ row }) => {
      const job: Job = row.getValue('job');
      return <span>{job?.title ?? ''}</span>;
    },
  },
  {
    accessorKey: 'candidate',
    header: 'Candidato',
    cell: ({ row }) => {
      const candidate: User = row.getValue('candidate');
      return (
        <span>{`${candidate?.firstName ?? ''} ${
          candidate?.lastName ?? ''
        }`}</span>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Fecha de aplicación',
    cell: ({ row }) => {
      const date: Timestamp = row.getValue('createdAt');
      return <span>{dayjs(date.toDate()).format('DD/MM/YYYY')}</span>;
    },
  },
  {
    id: 'action',
    cell: ({ row }) => {
      const status = row.getValue('active');
      const application = row.original;
      return (
        <button
          type="button"
          className={`${status ? 'text-rose-600' : 'text-muted-foreground/40'}`}
          disabled={!status}
          onClick={() => {
            disable(application);
          }}
        >
          <Trash2Icon size={20} />
        </button>
      );
    },
  },
];

export const recruiterCols: ColumnDef<Application>[] = [
  {
    accessorKey: 'active',
    header: 'Estatus',
    cell: ({ row }) => {
      const status = row.getValue('active');
      return (
        <span
          className={`flex items-center justify-start ${
            status ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          <DotIcon size={32} />
          {status ? 'Activa' : 'Inactiva'}
        </span>
      );
    },
  },
  {
    accessorKey: 'candidate',
    header: 'Candidato',
    cell: ({ row }) => {
      const candidate: User = row.getValue('candidate');
      return (
        <span>{`${candidate?.firstName ?? ''} ${
          candidate?.lastName ?? ''
        }`}</span>
      );
    },
  },
  {
    accessorKey: 'candidate',
    header: 'Titulo del candidato',
    cell: ({ row }) => {
      const candidate: User = row.getValue('candidate');
      return <span>{candidate?.title ?? 'No especificado'}</span>;
    },
  },
  {
    accessorKey: 'candidate',
    header: 'Ubicación del candidato',
    cell: ({ row }) => {
      const candidate: User = row.getValue('candidate');
      return <span>{candidate?.location ?? ''}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Fecha de aplicación',
    cell: ({ row }) => {
      const date: Timestamp = row.getValue('createdAt');
      return <span>{dayjs(date.toDate()).format('DD/MM/YYYY')}</span>;
    },
  },
];
