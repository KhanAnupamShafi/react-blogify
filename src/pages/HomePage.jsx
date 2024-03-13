import { useEffect, useRef, useState } from 'react';
import { instance } from '../api/axiosInstance';
import BlogCard from '../components/blogs/BlogCard';
import EmptyBlog from '../components/blogs/EmptyBlog';
import FavoriteBlogs from '../components/blogs/FavoriteBlogs';
import PopularBlogs from '../components/blogs/PopularBlogs';
import Loader from '../components/loader/Loader';
import SkeletonLoader from '../components/loader/SkeletonLoader';
import { Transition } from '../framer/transition';
import { useAuthContext } from '../hooks/useAuthContext';
import { useBlogContext } from '../hooks/useBlogContext';
import { actionTypes } from '../reducers';
const HomePage = () => {
  const { state, dispatch } = useBlogContext();
  const { auth } = useAuthContext();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const blogs = state?.blogs;
  const loaderRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      dispatch({ type: actionTypes.blog.FETCH_REQUEST });

      try {
        const response = await instance.get(
          `${import.meta.env.VITE_SERVER_BASE_URI}/blogs?page=${page}&limit=10`
        );
        if (response.status === 200) {
          const fetchedBlogs = response.data.blogs;
          if (fetchedBlogs.length === 0) {
            setHasMore(false);
          } else {
            dispatch({
              type: actionTypes.blog.FETCH_SUCCESS,
              payload: [...fetchedBlogs],
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
    <Transition>
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
          {!hasMore && (
            <Loader
              message={'End of Blogs. Stay tuned for more!'}
              spinner="off"
            />
          )}
        </div>

        <div className="md:col-span-2 h-full w-full space-y-5">
          <PopularBlogs />

          {auth.accessToken && <FavoriteBlogs />}
        </div>
      </div>
    </Transition>
  );
};

export default HomePage;
