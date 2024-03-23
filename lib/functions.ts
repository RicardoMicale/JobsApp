import { Job } from '@/models/models';
import { Timestamp } from 'firebase/firestore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('es');
dayjs.extend(relativeTime);

export const createObjectModel = () => {
  //  helper function to create the object model
  const seconds = new Date().getSeconds();
  const nanoseconds = seconds * 1000000000;
  return {
    active: true,
    createdAt: new Timestamp(seconds, nanoseconds),
    updatedAt: new Timestamp(seconds, nanoseconds),
  };
};

export const userModelDefaults = () => ({
  //  initializes user fields on registration
  jobs: [],
  about: '',
  title: '',
  skills: [],
  photo: '',
});

export const emailValidation = (email: string) => {
  //  validates email

  //  email is empty string
  if (!email) return false;

  //  email does not have @ symbol
  if (!email.includes('@')) return false;

  return true;
};

export const validateJob = (job: Job) => {
  if (!job.salary) {
    return [false, 'Debes especificar el salario'];
  }

  if (!job.title) {
    return [false, 'Debes especificar el título del puesto'];
  }

  if (!job.city && !job.country && !job.remote) {
    return [false, 'Debes especificar la localización del trabajo'];
  }

  return [true, ''];
};

export const getDate = (timestamp?: Timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate();

  return dayjs(date).fromNow();
};

export const getLocation = (_job: Job) => {
  return `${_job?.city ?? ''}, ${_job?.country ?? ''}`;
};

export const getSalary = (job: Job) => {
  const salary = job?.salary ?? 0;
  const yearly = salary / 1000;

  return `${yearly}k/año`;
};
