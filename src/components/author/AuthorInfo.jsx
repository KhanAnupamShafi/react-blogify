import { useProfile } from '../../hooks/useProfile';
import AuthorAvatar from './AuthorAvatar';
import AuthorBio from './AuthorBio';

const AuthorInfo = () => {
  const { profile } = useProfile();
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <AuthorAvatar />
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          {profile?.firstName} {profile?.lastName}
        </h3>
        <p className="leading-[231%] lg:text-lg">{profile?.email}</p>
      </div>

      <AuthorBio />
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  );
};

export default AuthorInfo;
