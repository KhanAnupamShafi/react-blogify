import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import CommentItem from './CommentItem';

const BlogComments = ({ comments = [] }) => {
  const { auth } = useAuthContext();
  const user = auth?.user;

  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">
          Comments ({comments.length})
        </h2>
        <div className="flex items -center space-x-4">
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
            <Link
              to={'/profile'}
              className="avater-img bg-indigo-600 text-white">
              <span className="capitalize">{user?.firstName[0]}</span>
            </Link>
          )}

          {/* <div className="avater-img bg-indigo-600 text-white">
            <span className="">S</span>
          </div> */}
          <div className="w-full">
            <textarea
              className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
              placeholder="Write a comment"></textarea>
            <div className="flex justify-end mt-4">
              <button className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                Comment
              </button>
            </div>
          </div>
        </div>

        {comments?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
};

export default BlogComments;
