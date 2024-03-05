import { Job } from '@/models/models';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getDate, getLocation, getSalary } from '@/lib/functions';
import { BanknoteIcon, BriefcaseIcon, MapPinIcon } from 'lucide-react';
import { Separator } from '../ui/separator';

interface JobCardProps {
  className?: string;
  job: Job;
}

export default function JobCard({ className, job }: JobCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <header className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-4">
            {job?.photo ? (
              <Avatar>
                <AvatarImage src={job?.photo ?? ''} alt={job?.title ?? ''} />
                <AvatarFallback>{job?.title ?? ''}</AvatarFallback>
              </Avatar>
            ) : (
              <BriefcaseIcon size={24} />
            )}
            <CardTitle className="text-lg">{job?.title ?? ''}</CardTitle>
          </div>
          <p className="font-light text-muted-foreground text-sm">
            {getDate(job?.createdAt) ?? ''}
          </p>
        </header>
      </CardHeader>
      <CardContent>
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
        </section>
      </CardContent>
    </Card>
  );
}
