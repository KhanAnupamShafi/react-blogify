import { useContext } from 'react';
import { ProfileContext } from '../context';

export const useProfileContext = () => {
  return useContext(ProfileContext);
};
