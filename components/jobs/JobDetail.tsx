'use client';

import { Job } from '@/models/models';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getDate, getLocation, getSalary } from '@/lib/functions';
import { Separator } from '../ui/separator';
import {
  ArrowRightIcon,
  BanknoteIcon,
  BriefcaseIcon,
  MapPinIcon,
} from 'lucide-react';
import ApplicationModal from '../applications/ApplicationModal';
import { Badge } from '../ui/badge';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import { Button } from '../ui/button';

interface JobDetailProps {
  job: Job;
}

export default function JobDetail({ job }: JobDetailProps) {
  const [user] = useUser();
  const isPoster = () => {
    return user?._id === job?.recruiter?._id;
  };
  return (
    <Card>
      <CardHeader>
        <header className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-4">
            {job?.photo ? (
              <Avatar>
                <AvatarImage src={job?.photo ?? ''} alt={job?.title ?? ''} />
                <AvatarFallback>{job?.title ?? ''}</AvatarFallback>
              </Avatar>
            ) : (
              <BriefcaseIcon size={32} />
            )}
            <CardTitle>{job?.title ?? ''}</CardTitle>
          </div>
          <p className="font-light text-muted-foreground text-sm">
            {getDate(job?.createdAt) ?? ''}
          </p>
        </header>
      </CardHeader>
      <CardContent>
        <main>
          <section className="flex flex-col items-start justify-start gap-2">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                {job?.recruiter?.companyName ?? 'Freelance'}
              </p>
              <Separator orientation="vertical" />
              <p className="text-sm flex items-center justify-start gap-2">
                <BanknoteIcon size={16} />
                {getSalary(job)}
              </p>
            </div>
            <p className="text-sm text-muted-foreground flex items-center justify-start gap-1">
              <MapPinIcon size={16} />
              {job?.remote ? 'Remoto' : getLocation(job)}
            </p>
            <div className="space-x-2">
              {job?.tags?.map((tag, index) => (
                <Badge key={index}>{tag}</Badge>
              ))}
            </div>
          </section>
          <section className="my-6">
            {user?.role === 'candidate' && <ApplicationModal job={job} />}
            {isPoster() && (
              <Button asChild className="gap-2">
                <Link href={`/app/jobs/${job?._id}`}>
                  Ver candidatos <ArrowRightIcon size={20} />
                </Link>
              </Button>
            )}
          </section>
          <div className="space-y-6">
            <section className="space-y-2">
              <h3 className="text-lg font-bold text-foreground">
                Acerca de la posición
              </h3>
              <p className="text-foreground/60">
                {job?.description ?? 'No hay descripción para este puesto'}
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="text-lg font-bold text-foreground">
                Requerimientos
              </h3>
              <ul
                className={`${
                  job?.requirements?.length ? 'pl-6' : ''
                } text-foreground/60`}
              >
                {job?.requirements?.map((requirement, index) => (
                  <li className="list-disc" key={index}>
                    {requirement}
                  </li>
                )) ?? 'No se especifican requerimientos'}
              </ul>
            </section>
            <section className="space-y-2">
              <h3 className="text-lg font-bold text-foreground">
                Responsabilidades
              </h3>
              <ul
                className={`${
                  job?.responsibilities?.length ? 'pl-6' : ''
                } text-foreground/60`}
              >
                {job?.responsibilities?.map((responsibility, index) => (
                  <li className="list-disc" key={index}>
                    {responsibility}
                  </li>
                )) ?? 'No se especifican responsabilidades'}
              </ul>
            </section>
          </div>
        </main>
      </CardContent>
    </Card>
  );
}
