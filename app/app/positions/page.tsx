'use client';

import React from 'react';
import Jobs from '@/components/jobs/Jobs';
import { getJobsByRecruiter } from '@/firebase/queries';
import { Job } from '@/models/models';
import { useUser } from '@/hooks/useUser';

export default function JobsPage() {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [user] = useUser();

  getJobsByRecruiter(user?._id ?? '').then((res) => {
    if (res && !jobs.length) {
      setJobs([...res.map((doc) => ({ ...doc.data() }))]);
    }
    return res;
  });

  return (
    <div>
      <Jobs allJobs={jobs} />
    </div>
  );
}
