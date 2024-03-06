import BlogActions from '../components/blogs/BlogActions';
import BlogComments from '../components/blogs/BlogComments';
import BlogContents from '../components/blogs/BlogContents';

const BlogDetailPage = () => {
  return (
    <>
      <BlogContents />
      <BlogComments />
      <BlogActions />
    </>
  );
};

export default BlogDetailPage;
