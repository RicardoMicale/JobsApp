import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { app } from './firebase';
import { User } from '@/models/models';
import { createUser, getUser } from './queries';

export const auth = getAuth(app);

export const register = async (user: User, password: string) => {
  try {
    if (!user) {
      throw new Error('Invalid user');
    } else if (!user?.email) {
      throw new Error('Provide an email');
    }
    const { email } = user;
    const newUser = (
      await createUserWithEmailAndPassword(auth, email, password)
    ).user;

    if (newUser) {
      return await createUser(user, newUser?.uid);
    }
    return null;
  } catch (err) {
    console.log(err);
  }
};

export const singIn = async (email: string, password: string) => {
  const user = (await signInWithEmailAndPassword(auth, email, password)).user;

  if (user) {
    return await getUser(user?.uid);
  }
  return null;
};

export const signOut = async () => {
  auth.signOut();
};

export const currentUser = async () => {
  const user = auth.currentUser;
  if (user) {
    const _user = await getUser(user?.uid);
    return _user?.data();
  }

  return null;
};
