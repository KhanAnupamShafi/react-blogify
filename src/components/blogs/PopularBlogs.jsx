import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { instance } from '../../api/axiosInstance';
import FavouriteLoader from '../loader/FavouriteLoader';
import EmptyBlog from './EmptyBlog';

const PopularBlogs = () => {
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPopularBlogs = async () => {
      try {
        setLoading(true);
        //fetch favorite blogs
        const response = await instance.get('/blogs/popular');
        if (response.status === 200) {
          setPopularBlogs(response?.data?.blogs);
        }
      } catch (error) {
        console.error('Error fetching favorite blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularBlogs();
  }, []);
  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold mb-1">
        Most Popular 👍️
      </h3>
      {popularBlogs.length === 0 && !loading && <EmptyBlog />}
      {loading ? (
        <FavouriteLoader />
      ) : (
        <ul className="space-y-5 my-5">
          {popularBlogs.map((blog) => (
            <li key={blog.id}>
              <Link to={'/blog/' + blog.id}>
                <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                  {blog?.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  <Link to={`/profile/${blog?.author?.id}`}>
                    <span className=" capitalize">
                      by {blog?.author?.firstName} {blog?.author?.lastName}
                    </span>
                  </Link>
                  <span>·</span> {blog?.likes?.length} Likes
                </p>
              </Link>
            </li>
          ))}

          {/* <li>
          <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
            How to Auto Deploy a Next.js App on Ubuntu from GitHub
          </h3>
          <p className="text-slate-600 text-sm">
            by
            <a href="./profile.html">Saad Hasan</a>
            <span>·</span> 100 Likes
          </p>
        </li> */}
        </ul>
      )}
    </div>
  );
};

export default PopularBlogs;
