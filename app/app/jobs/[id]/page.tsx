'use client';

import ApplicationsTable from '@/components/applications/ApplicationsTable';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getApplicationsByJob, getJob } from '@/firebase/queries';
import { Application, Job } from '@/models/models';
import { useParams } from 'next/navigation';
import React from 'react';

export default function JobPage() {
  const { id } = useParams();

  const [applications, setApplications] = React.useState<Application[]>([]);
  const [job, setJob] = React.useState<Job>({});

  getApplicationsByJob(typeof id === 'string' ? id : id[0]).then((res) => {
    if (res && !applications.length) {
      setApplications([...res.map((doc) => ({ ...doc.data() }))]);
    }
    return res;
  });

  getJob(typeof id === 'string' ? id : id[0]).then((res) => {
    if (res && !job?._id) {
      setJob(res?.data() ?? {});
    }
  });

  return (
    <div>
      <header>
        {job?.photo && (
          <Avatar>
            <AvatarImage src={job?.photo ?? ''} alt={job?.title ?? ''} />
            <AvatarFallback>{job?.title}</AvatarFallback>
          </Avatar>
        )}
        <h3 className="font-bold text-foreground text-lg md:text-xl lg:text-3xl">
          {job?.title ?? ''}
        </h3>
      </header>
      <ApplicationsTable applications={applications} recruiter />
    </div>
  );
}
