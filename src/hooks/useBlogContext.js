import { useContext } from 'react';
import { BlogContext } from '../context';

export const useBlogContext = () => {
  return useContext(BlogContext);
};
