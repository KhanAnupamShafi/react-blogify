import { Link, useNavigate } from 'react-router-dom';
import Search from '../../assets/icons/search.svg';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useProfileContext } from '../../hooks/useProfileContext';
/**
<!-- Actions - Login, Write, Home, Search -->
                <!-- Notes for Developers -->
                <!-- For Logged in User - Write, Profile, Logout Menu -->
                <!-- For Not Logged in User - Login Menu -->
 */
const HeaderActions = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuthContext();
  const { state } = useProfileContext();

  const user = state?.user ?? auth?.user;
  const handleLogout = () => {
    setAuth({});
    navigate('/login');
  };

  return (
    <ul className="flex items-center space-x-5">
      <li>
        <a
          href="./createBlog.html"
          className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
          Write
        </a>
      </li>
      <li>
        <a
          href="./search.html"
          className="flex items-center gap-2 cursor-pointer">
          <img src={Search} alt="Search" />
          <span>Search</span>
        </a>
      </li>
      <li>
        {!auth?.user ? (
          <Link
            to="/login"
            className="text-white/50 hover:text-white transition-all duration-200">
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="text-white/50 hover:text-white transition-all duration-200">
            Logout
          </button>
        )}
      </li>
      <li className="flex items-center">
        {user?.avatar ? (
          <Link
            to={'/profile'}
            className="avater-img bg-orange-600 text-white max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]">
            <img
              className="rounded-full overflow-hidden w-full h-full"
              src={`${import.meta.env.VITE_SERVER_BASE_URI}/uploads/avatar/${
                user.avatar
              }`}
              alt="avatar"
            />
          </Link>
        ) : (
          <Link to={'/profile'} className="avater-img bg-orange-600 text-white">
            <span className="capitalize">{user?.firstName[0]}</span>
          </Link>
        )}

        {/* <!-- Logged-in user's name --> */}
        <Link to={'/profile'}>
          <span className="text-white ml-2">
            {user?.firstName} {user?.lastName}
          </span>
        </Link>
        {/* <!-- Profile Image --> */}
      </li>
    </ul>
  );
};

export default HeaderActions;
