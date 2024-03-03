import { useContext, useDebugValue } from 'react';
import { AuthContext } from '../context';

export const useAuthContext = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) =>
    auth?.user ? `Logged In: ${auth?.user.email}` : 'Logged Out'
  );
  return useContext(AuthContext);
};
