import { Timestamp } from 'firebase/firestore';

interface ObjectModel {
  active?: Boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export type JobStatusEnum = 'open' | 'closed';

export type RoleEnum = 'recruiter' | 'candidate';

export interface User extends ObjectModel {
  _id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: RoleEnum;
  jobs?: Job[];
  title?: string;
  location?: string;
  companyName?: string;
  photo?: string;
}

export interface Application extends ObjectModel {
  _id?: string;
  candidate?: User;
  job?: Job;
}

export interface Job extends ObjectModel {
  _id?: string;
  title?: string;
  description?: string;
  recruiter?: User;
  tags?: string[];
  remote?: boolean;
  country?: string;
  city?: string;
  candidates?: Application[];
  salary?: number;
  status?: JobStatusEnum;
  photo?: string;
  requirements?: string[];
  responsibilities?: string[];
}

export interface Route {
  text: string;
  href: string;
  icon: any;
  permissions?: string[];
}
