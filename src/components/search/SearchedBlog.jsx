import { Link } from 'react-router-dom';

const SearchedBlog = ({ blog, onClose }) => {
  const { title, thumbnail, content, id } = blog || {};
  return (
    <Link
      onClick={onClose}
      to={'/blog/' + id}
      className="flex sm:flex-row flex-col gap-6 py-2 cursor-pointer ">
      <div className="">
        <img
          className="max-h-28 w-28 sm:h-auto sm:w-auto sm:min-w-56 object-cover"
          src={`${
            import.meta.env.VITE_SERVER_BASE_URI
          }/uploads/blog/${thumbnail}`}
          alt={title}
        />
      </div>
      <div className="mt-2 max-w-screen-lg  truncate">
        <h3 className="text-slate-300 text-xl font-bold ">{title} </h3>
        <p className="mb-6 text-sm text-slate-500 mt-1 overflow-hidden overflow-ellipsis ">
          {content}
        </p>
      </div>
    </Link>
  );
};

export default SearchedBlog;
