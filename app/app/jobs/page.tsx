'use client';

import React from 'react';
import Jobs from '@/components/jobs/Jobs';
import { getJobs } from '@/firebase/queries';
import { Job } from '@/models/models';

export default function JobsPage() {
  const [jobs, setJobs] = React.useState<Job[]>([]);

  getJobs().then((res) => {
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
