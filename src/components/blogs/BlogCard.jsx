import { Link } from 'react-router-dom';
import { useAvatar } from '../../hooks/useAavatar';
import { getFormattedDate } from '../../utils';

const BlogCard = ({ blog }) => {
  const { avatarUrl } = useAvatar(blog);
  return (
    <div className="blog-card">
      <img
        className="blog-thumb"
        src={`${import.meta.env.VITE_SERVER_BASE_URI}/uploads/blog/${
          blog?.thumbnail
        }`}
        alt="blog thumbnail"
      />
      <div className="mt-2">
        <h3 className="text-slate-300 text-xl lg:text-2xl">{blog?.title}</h3>
        <p className="mb-6 text-base text-slate-500 mt-1">{blog?.content}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            {avatarUrl ? (
              <Link
                to={'/profile'}
                className="avater-img bg-orange-600 text-white max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]">
                <img
                  className="rounded-full overflow-hidden w-full h-full"
                  src={avatarUrl}
                  alt="avatar"
                />
              </Link>
            ) : (
              <div className="avater-img bg-indigo-600 text-white">
                <span className="">{blog?.author?.firstName[0]}</span>
              </div>
            )}

            <div>
              <h5 className="text-slate-500 text-sm">
                {blog?.author?.firstName} {blog?.author?.lastName}{' '}
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>{getFormattedDate(blog?.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-slate-700">
            {blog?.likes.length === 0 ? (
              <span>No Likes</span>
            ) : (
              <span>
                {blog?.likes.length}{' '}
                {blog?.likes.length === 1 ? 'Like' : 'Likes'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
