'use client';

import React from 'react';
import { getApplications } from '@/firebase/queries';
import { Application } from '@/models/models';
import ApplicationsTable from '@/components/applications/ApplicationsTable';
import { useUser } from '@/hooks/useUser';

export default function ApplicationsPage() {
  const [applications, setApplications] = React.useState<Application[]>([]);
  const [user] = useUser();

  getApplications(user?._id).then((res) => {
    if (res && !applications.length) {
      setApplications([...res.map((doc) => ({ ...doc.data() }))]);
    }
    return res;
  });
  return (
    <div>
      <ApplicationsTable applications={applications} />
    </div>
  );
}
