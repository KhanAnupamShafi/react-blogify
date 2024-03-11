import { useProfileContext } from './useProfileContext';

export const useAvatar = (blog) => {
  const { state } = useProfileContext();
  const isMe = state?.user?.id === blog?.author?.id;
  const avatar = isMe ? state?.user?.avatar : blog?.author?.avatar;

  const avatarUrl = `${
    import.meta.env.VITE_SERVER_BASE_URI
  }/uploads/avatar/${avatar}`;

  return { avatarUrl };
};
