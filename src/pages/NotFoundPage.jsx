import { Link } from 'react-router-dom';
import PlaySVG from '../assets/play.svg';
const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-6xl font-extrabold tracking-tighter/none">404</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Oops! Something is wrong.
        </p>
      </div>
      <Link
        className="flex h-11 items-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        to={'/'}>
        <img src={PlaySVG} alt="" className="mr-2" />
        Go back to the initial page
      </Link>
    </div>
  );
};

export default NotFoundPage;
