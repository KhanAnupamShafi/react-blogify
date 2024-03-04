import { Link, useNavigate } from 'react-router-dom';
import Search from '../../assets/icons/search.svg';
import { useAuthContext } from '../../hooks/useAuthContext';
/**
<!-- Actions - Login, Write, Home, Search -->
                <!-- Notes for Developers -->
                <!-- For Logged in User - Write, Profile, Logout Menu -->
                <!-- For Not Logged in User - Login Menu -->
 */
const HeaderActions = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuthContext();

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
        <Link to={'/profile'} className="avater-img bg-orange-600 text-white">
          <span className="">S</span>
        </Link>

        {/* <!-- Logged-in user's name --> */}
        <Link to={'/profile'}>
          <span className="text-white ml-2">
            {auth?.user?.firstName} {auth?.user?.lastName}
          </span>
        </Link>
        {/* <!-- Profile Image --> */}
      </li>
    </ul>
  );
};

export default HeaderActions;
