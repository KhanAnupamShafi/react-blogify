import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import FavouriteLoader from '../loader/FavouriteLoader';
import EmptyBlog from './EmptyBlog';

const FavoriteBlogs = () => {
  const [favoriteBlogs, setFavoriteBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { api } = useAxios();
  useEffect(() => {
    const fetchFavoriteBlogs = async () => {
      try {
        setLoading(true);
        //fetch favorite blogs
        const response = await api.get('/blogs/favourites');
        if (response.status === 200) {
          setFavoriteBlogs(response?.data?.blogs);
        }
      } catch (error) {
        console.error('Error fetching favorite blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteBlogs();
  }, [api]);

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold mb-2">
        Your Favourites ❤️
      </h3>
      {favoriteBlogs.length === 0 && <EmptyBlog />}
      {loading ? (
        <FavouriteLoader />
      ) : (
        <ul className="space-y-5 my-5">
          {favoriteBlogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blog/${blog.id}`}>
                <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                  {blog.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {blog.tags
                    .split(',')
                    .map((tag) => `#${tag.trim()}`)
                    .join(', ')}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteBlogs;
