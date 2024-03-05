import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from './firebase';
import { createObjectModel } from '@/lib/functions';
import { Application, Job, User } from '@/models/models';

const db = getFirestore(app);
const storage = getStorage(app);

//  collections

const users = collection(db, 'users');
const jobs = collection(db, 'jobs');
const candidates = collection(db, 'candidates');
const recruiters = collection(db, 'recruiters');
const applications = collection(db, 'applications');

//  USER

//  create
export const createUser = async (user: User, id: string) => {
  try {
    const userRef = doc(db, 'users', id);
    const newUser = { ...user, ...createObjectModel(), _id: id };
    setDoc(userRef, newUser);
    return newUser;
  } catch (err) {
    console.log(err);
  }
};

//  update
export const updateUser = async (
  user: User,
  id: string,
  disable: boolean = false
) => {
  try {
    const userRef = doc(db, 'users', id);
    //  if its a disable operation, receives true and assigns active to false
    const updatedUser = { ...user, updatedAt: new Date(), active: !disable };

    await updateDoc(userRef, updatedUser);

    return updatedUser;
  } catch (err) {
    console.log(err);
  }
};

//  get
export const getUsers = async () => {
  try {
    const q = query(users, where('active', '==', true));

    const allUsers = (await getDocs(q)).docs.map((doc) => {
      doc.data();
    });

    return allUsers;
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (id: string) => {
  try {
    const userRef = doc(db, 'users', id);
    const user = await getDoc(userRef);

    return user;
  } catch (err) {
    console.log(err);
  }
};

//  JOB

//  create
export const createJob = async (job: Job) => {
  try {
    const newJob = { ...job, ...createObjectModel(), candidates: [] };
    //  creates job
    const _job = await addDoc(jobs, newJob);
    //  sets job id
    await setDoc(_job, { ...newJob, _id: _job.id });
    return newJob;
  } catch (err) {
    console.log(err);
  }
};

//  update
export const updateJob = async (
  job: Job,
  id: string,
  disable: boolean = false
) => {
  try {
    const jobRef = doc(db, 'jobs', id);
    //  if its a disable operation, receives true and assigns active to false
    const updatedJob = { ...job, updatedAt: new Date(), active: !disable };

    await updateDoc(jobRef, updatedJob);
  } catch (err) {
    console.log(err);
  }
};

//  get
export const getJobs = async () => {
  try {
    const q = query(jobs, where('active', '==', true));

    const allJobs = await getDocs(q);

    return allJobs.docs;
  } catch (err) {
    console.log(err);
  }
};

export const getJobsByRecruiter = async (recruiterId: string) => {
  try {
    const q = query(
      jobs,
      where('active', '==', true),
      where('recruiter._id', '==', recruiterId)
    );

    const allJobs = await getDocs(q);

    return allJobs.docs;
  } catch (err) {
    console.log(err);
  }
};

export const getJob = async (id: string) => {
  try {
    const jobRef = doc(db, 'jobs', id);
    const job = await getDoc(jobRef);

    return job;
  } catch (err) {
    console.log(err);
  }
};

//  APPLICATION

//  helper
const verifyApplication = (
  application: Application,
  applications: Application[]
) => {
  //  gets the job and candidate to search
  const job = application?.job;
  const candidate = application?.candidate;

  //  filters by job
  const jobApps = applications?.filter((app) => app?.job?._id === job?._id);

  //  finds if candidate has already applied
  const alreadyApplied = jobApps.find(
    (app) => app?.candidate?._id === candidate?._id
  );

  return alreadyApplied;
};

//  create
export const createApplication = async (application: Application) => {
  try {
    const newApplication = {
      ...application,
      ...createObjectModel(),
    };
    //  gets all applications
    const apps = await getApplications();
    if (
      verifyApplication(newApplication, apps?.map((doc) => doc?.data()) ?? [])
    ) {
      throw new Error('Already applied!');
    }
    //  creates application
    const app = await addDoc(applications, newApplication);
    //  updates application with document id
    await setDoc(app, { ...newApplication, _id: app.id });

    return newApplication;
  } catch (err) {
    console.log(err);
  }
};

//  update
export const updateApplication = async (
  application: Application,
  id: string,
  disable: boolean = false
) => {
  try {
    const applicationRef = doc(db, 'applications', id);
    //  if its a disable operation, receives true and assigns active to false
    const updatedApplication = {
      ...application,
      updatedAt: new Date(),
      active: !disable,
    };

    await updateDoc(applicationRef, updatedApplication);
  } catch (err) {
    console.log(err);
  }
};

//  get
export const getApplications = async (userId?: string) => {
  try {
    const q = query(applications, where('candidate._id', '==', userId));

    const allApplications = (await getDocs(q)).docs;

    return allApplications;
  } catch (err) {
    console.log(err);
  }
};

export const getApplication = async (id: string) => {
  try {
    const applicationRef = doc(db, 'applications', id);
    const application = await getDoc(applicationRef);

    return application;
  } catch (err) {
    console.log(err);
  }
};

export const getApplicationsByJob = async (jobId?: string) => {
  try {
    const q = query(applications, where('job._id', '==', jobId));

    const allApplications = (await getDocs(q)).docs;
    return allApplications;
  } catch (err) {
    console.log(err);
  }
};

//  PHOTOS
export const uploadImage = async (path: string, file: File) => {
  const imageStore = ref(storage, `images/${path}`);
  const res = await uploadBytes(imageStore, file);
  return res;
};

export const getImage = async (path: string) => {
  const imageStore = ref(storage, path);
  const url = await getDownloadURL(imageStore);
  return url;
};
