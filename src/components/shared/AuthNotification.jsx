import { Link } from 'react-router-dom';

const AuthNotification = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div>
        <div className="flex items-center justify-between space-x-4">
          <h1 className="text-xl font-bold text-gray-100">
            Authentication Required
          </h1>
        </div>

        <p className="mt-2 text-md text-zinc-400">
          You are not logged in. Please log in or register to continue.
        </p>

        <div className="flex justify-end mt-6">
          <Link
            to="/login"
            className="mr-2 px-2 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-500 hover:bg-gray-600 rounded-md shadow-md">
            Log In
          </Link>
          <Link
            to="/register"
            className="px-2 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-500 hover:bg-red-600 rounded-md shadow-md">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthNotification;
