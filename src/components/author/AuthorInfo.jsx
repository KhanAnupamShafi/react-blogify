import { useProfileContext } from '../../hooks/useProfileContext';
import AuthorAvatar from './AuthorAvatar';
import AuthorBio from './AuthorBio';

const AuthorInfo = () => {
  const { state } = useProfileContext();
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <AuthorAvatar />
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          {state?.user?.firstName} {state?.user?.lastName}
        </h3>
        <p className="leading-[231%] lg:text-lg">saadhasan@gmail.com</p>
      </div>

      <AuthorBio />
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  );
};

export default AuthorInfo;
