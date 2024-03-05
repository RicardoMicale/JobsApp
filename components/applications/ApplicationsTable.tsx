import { Application } from '@/models/models';
import React from 'react';
import DataTable from '../ui/data-table';
import { columns, recruiterCols } from '@/components/applications/columns';

interface ApplicationsTableProps {
  applications: Application[];
  recruiter?: boolean;
}

export default function ApplicationsTable({
  applications,
  recruiter,
}: ApplicationsTableProps) {
  return (
    <div className="container py-10">
      <DataTable
        columns={recruiter ? recruiterCols : columns}
        data={applications}
      />
    </div>
  );
}
