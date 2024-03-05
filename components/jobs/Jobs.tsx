'use client';

import { Job } from '@/models/models';
import React from 'react';
import JobList from './JobList';
import JobDetail from './JobDetail';
import { Button } from '../ui/button';
import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import JobModal from './JobModal';
import Search from './Search';

interface JobsProps {
  allJobs: Job[];
}

export default function Jobs({ allJobs }: JobsProps) {
  const router = useRouter();
  const [user] = useUser();

  //  states
  const [jobs, setJobs] = React.useState<Job[]>([...allJobs]);
  const [search, setSearch] = React.useState('');
  //  job for the job detail and set job for the job list
  const [job, setJob] = React.useState<Job>(allJobs[0]);

  const handleSearch = (searchParam: string) => {
    const _jobs = allJobs?.filter((_job) =>
      _job?.title?.toLowerCase().includes(searchParam?.toLowerCase())
    );

    setJobs([..._jobs]);
  };

  React.useEffect(() => {
    if (allJobs?.length) {
      setJobs([...allJobs]);
      setJob(allJobs[0]);
    }
  }, [allJobs]);

  if (!allJobs.length) {
    return (
      <div>
        <h3 className="text-2xl font-bold text-foreground">
          No hay trabajos en este momento
        </h3>
        <p className="text-secondary-foreground/70 mt-2 mb-6">
          Recargue la página o espere a que algún reclutador abra un puesto
        </p>
        <Button className="gap-2" onClick={() => router.refresh()}>
          Recargar <RefreshCw size={16} />
        </Button>
      </div>
    );
  }

  return (
    <main>
      <h3 className="text-3xl text-foreground font-bold">Puestos</h3>
      <section className="flex items-start justify-between gap-4 mt-2">
        <div className="w-1/2 overflow-scroll">
          <div className="my-4">
            <Search
              search={search}
              setSearch={setSearch}
              action={handleSearch}
            />
          </div>
          <div className="my-2">
            {user?.role === 'recruiter' && <JobModal />}
          </div>
          <div className="my-4">
            <JobList
              jobs={jobs}
              setJobs={setJobs}
              job={job}
              setJob={setJob}
              search={search}
              setSearch={setSearch}
            />
          </div>
        </div>
        <div className="w-1/2">
          <JobDetail job={job} />
        </div>
      </section>
    </main>
  );
}
