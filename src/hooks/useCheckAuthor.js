import { useAuthContext } from './useAuthContext';

export const useCheckAuthor = (blog) => {
  const { auth } = useAuthContext();

  const hasPermission = blog?.author?.id === auth?.user?.id;

  return { hasPermission };
};
