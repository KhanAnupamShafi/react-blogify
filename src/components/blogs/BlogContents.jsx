import { useNavigate } from 'react-router-dom';
import RectBlogSVG from '../../assets/blogs/React-Roadmap.jpg';
import { getFormattedDate } from '../../utils';
const BlogContents = ({ blog }) => {
  const { title, thumbnail, content, tags, createdAt, likes, author } =
    blog || {};
  const navigate = useNavigate();
  const navigateToProfile = (e) => {
    e.stopPropagation();
    navigate(`/profile/${author?.id}`);
  };
  return (
    <section>
      <div className="container text-center py-8">
        <h1 className="font-bold text-3xl md:text-5xl">{title} </h1>
        <div className="flex justify-center items-center my-4 gap-4">
          <div className="flex items-center capitalize space-x-2">
            {author?.avatar ? (
              <div
                onClick={navigateToProfile}
                className="avater-img bg-orange-600 text-white max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px] cursor-pointer">
                <img
                  className="rounded-full overflow-hidden w-full h-full"
                  src={`${
                    import.meta.env.VITE_SERVER_BASE_URI
                  }/uploads/avatar/${author.avatar}`}
                  alt="avatar"
                />
              </div>
            ) : (
              <div
                onClick={navigateToProfile}
                className="avater-img bg-indigo-600 text-white cursor-pointer">
                <span className="capitalize">{author?.firstName[0]}</span>
              </div>
            )}
            <div onClick={navigateToProfile} className="cursor-pointer">
              <h5 className="text-slate-500 text-sm">
                {author?.firstName} {author?.lastName}
              </h5>
            </div>
          </div>
          <span className="text-sm text-slate-700 dot">
            {getFormattedDate(createdAt)}
          </span>
          <span className="text-sm text-slate-700 dot">
            {' '}
            {likes?.length === 0 ? (
              <span>No Likes</span>
            ) : (
              <span>
                {likes?.length} {likes?.length === 1 ? 'Like' : 'Likes'}
              </span>
            )}
          </span>
        </div>
        {thumbnail ? (
          <img
            className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
            src={`${
              import.meta.env.VITE_SERVER_BASE_URI
            }/uploads/blog/${thumbnail}`}
            alt="thumbnail of blog"
          />
        ) : (
          <img
            className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
            src={RectBlogSVG}
            alt="thumbnail"
          />
        )}

        {/* <!-- Tags --> */}
        <ul className="tags">
          {tags?.split(',')?.map((tag, i) => (
            <li key={i} className="capitalize">
              {tag.trim()}
            </li>
          ))}
        </ul>

        {/* <!-- Content --> */}
        <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </section>
  );
};

export default BlogContents;
