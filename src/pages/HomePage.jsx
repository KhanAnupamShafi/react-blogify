import { useEffect, useRef, useState } from 'react';
import { instance } from '../api/axiosInstance';
import BlogCard from '../components/blogs/BlogCard';
import EmptyBlog from '../components/blogs/EmptyBlog';
import FavoriteBlogs from '../components/blogs/FavoriteBlogs';
import SkeletonLoader from '../components/loader/SkeletonLoader';
import { useBlogContext } from '../hooks/useBlogContext';
import { actionTypes } from '../reducers';

const HomePage = () => {
  const { state, dispatch } = useBlogContext();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const blogs = state?.blogs;
  const loaderRef = useRef();
  useEffect(() => {
    const fetchBlogs = async () => {
      dispatch({ type: actionTypes.blog.FETCH_REQUEST });

      try {
        const response = await instance.get(
          `${import.meta.env.VITE_SERVER_BASE_URI}/blogs?page=${page}&limit=5`
        );
        if (response.status === 200) {
          const fetchedBlogs = response.data.blogs;
          if (fetchedBlogs.length === 0) {
            setHasMore(false);
          } else {
            dispatch({
              type: actionTypes.blog.FETCH_SUCCESS,
              payload: [...blogs, ...fetchedBlogs],
            });
            setPage((prevPage) => prevPage + 1);
          }
        }
      } catch (error) {
        console.log(error, 'home page error');
        dispatch({
          type: actionTypes.blog.FETCH_FAILURE,
          payload:
            error?.response?.data?.error ||
            'Unknown error while fetching blog data',
        });
      }
    };

    const onIntersection = (items) => {
      const loaderItem = items[0];
      console.log('loaderItem.isIntersecting:', loaderItem.isIntersecting);
      if (loaderItem.isIntersecting && hasMore) {
        fetchBlogs();
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: '10px',
      threshold: 0.9,
    };

    const observer = new IntersectionObserver(onIntersection, observerOptions);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasMore, page, dispatch, blogs]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
      <div className="space-y-3 md:col-span-5">
        {/* <!-- Blog Card Start --> */}
        {blogs.length > 0 ? (
          blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <EmptyBlog />
        )}

        {hasMore && (
          <div ref={loaderRef}>
            <SkeletonLoader />
          </div>
        )}
      </div>

      <div className="md:col-span-2 h-full w-full space-y-5">
        <div className="sidebar-card">
          <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
            Most Popular 👍️
          </h3>

          <ul className="space-y-5 my-5">
            <li>
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                How to Auto Deploy a Next.js App on Ubuntu from GitHub
              </h3>
              <p className="text-slate-600 text-sm">
                by
                <a href="./profile.html">Saad Hasan</a>
                <span>·</span> 100 Likes
              </p>
            </li>

            <li>
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                How to Auto Deploy a Next.js App on Ubuntu from GitHub
              </h3>
              <p className="text-slate-600 text-sm">
                by
                <a href="./profile.html">Saad Hasan</a>
                <span>·</span> 100 Likes
              </p>
            </li>

            <li>
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                How to Auto Deploy a Next.js App on Ubuntu from GitHub
              </h3>
              <p className="text-slate-600 text-sm">
                by
                <a href="./profile.html">Saad Hasan</a>
                <span>·</span> 100 Likes
              </p>
            </li>

            <li>
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                How to Auto Deploy a Next.js App on Ubuntu from GitHub
              </h3>
              <p className="text-slate-600 text-sm">
                by
                <a href="./profile.html">Saad Hasan</a>
                <span>·</span> 100 Likes
              </p>
            </li>
          </ul>
        </div>

        <FavoriteBlogs />
      </div>
    </div>
  );
};

export default HomePage;
