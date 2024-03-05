'use client';

import React from 'react';
import { auth, currentUser } from '@/firebase/auth';
import { User } from '@/models/models';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { getUser } from '@/firebase/queries';

interface UserContextProps {
  children: React.ReactNode;
}

export type TUserContext = {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = React.createContext<TUserContext>({});

export default function UserContextProvider({ children }: UserContextProps) {
  const router = useRouter();

  const [user, setUser] = React.useState<User>({});

  //  current user
  React.useEffect(() => {
    onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        const __user = await getUser(_user.uid);
        setUser(__user?.data() ?? {});
      } else {
        router.push('/auth/sign-in');
      }
    });
  }, []);

  const context = React.useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}
