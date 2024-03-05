'use client';

import React from 'react';
import { Job } from '@/models/models';
import JobCard from './JobCard';
import { Button } from '../ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';
import { useToast } from '../ui/use-toast';

interface JobListProps {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  job: Job;
  setJob: React.Dispatch<React.SetStateAction<Job>>;
}

export default function JobList({
  jobs,
  setJobs,
  search,
  setSearch,
  job,
  setJob,
}: JobListProps) {
  const { toast } = useToast();
  //  jobs shown on screen
  const [currentJobs, setCurrentJobs] = React.useState<Job[]>(jobs.slice(0, 9));
  //  pagination for jobs
  const [page, setPage] = React.useState(1);

  // FUNCTIONS

  const handlePagination = (direction: string) => {
    const lastIndex = jobs.indexOf(currentJobs[currentJobs.length - 1]);
    const firstIndex = jobs.indexOf(currentJobs[0]);
    const arrayEnd = jobs.length - 1;

    if (direction === 'back') {
      if (page === 1 || firstIndex === 0) {
        toast({
          title: 'Esta es la primera página',
        });
        return;
      }
      setCurrentJobs(
        jobs.slice(
          firstIndex - 10 > 0 ? firstIndex - 10 : 0,
          firstIndex - 10 > 0 ? lastIndex - 10 : 9
        )
      );
      setPage(page - 1);
    }
    if (direction === 'forward') {
      if (lastIndex === arrayEnd) {
        //  cannot go forward
        toast({
          title: 'Esta es la última página',
        });
        return;
      }
      setCurrentJobs(
        jobs.slice(
          firstIndex + 10,
          lastIndex + 10 > arrayEnd ? arrayEnd : lastIndex + 10
        )
      );
      setPage(page + 1);
    }
  };

  React.useEffect(() => {
    if (jobs.length) setCurrentJobs(jobs.slice(0, 9));
  }, [jobs]);

  return (
    <div className="space-y-4">
      {currentJobs?.map((_job, index) => (
        <button
          key={index}
          className="w-full"
          onClick={() => setJob({ ..._job })}
        >
          <JobCard
            className={`${
              job?._id === _job?._id
                ? 'bg-primary/10 border-primary/70'
                : 'hover:bg-muted'
            }`}
            job={_job}
          />
        </button>
      ))}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePagination('back')} />
          </PaginationItem>
          <PaginationItem>{page}</PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => handlePagination('forward')} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
