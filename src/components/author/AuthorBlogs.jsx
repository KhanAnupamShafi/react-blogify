import { useProfileContext } from '../../hooks/useProfileContext';
import BlogCard from '../blogs/BlogCard';
import EmptyBlog from '../blogs/EmptyBlog';

const AuthorBlogs = () => {
  const { state } = useProfileContext();
  const blogs = state?.blogs;
  return (
    <div className="my-6 space-y-4">
      {blogs.length > 0 ? (
        blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)
      ) : (
        <EmptyBlog />
      )}
    </div>
  );
};

export default AuthorBlogs;
