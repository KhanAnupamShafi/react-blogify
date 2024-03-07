import { useProfileContext } from './useProfileContext';

export const useProfile = () => {
  const { state } = useProfileContext();

  const profile = state.author ?? state.user;

  return { profile };
};
