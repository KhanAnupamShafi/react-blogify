import { useEffect, useReducer } from 'react';
import { instance } from '../api/axiosInstance';
import BlogCard from '../components/blogs/BlogCard';
import EmptyBlog from '../components/blogs/EmptyBlog';
import { actionTypes } from '../reducers';
import { blogReducer, initialState } from '../reducers/blogReducer';

const HomePage = () => {
  const [state, dispatch] = useReducer(blogReducer, initialState);
  const blogs = state?.blogs;
  useEffect(() => {
    dispatch({ type: actionTypes.blog.FETCH_REQUEST });

    const fetchBlogs = async () => {
      try {
        const response = await instance.get(
          `${import.meta.env.VITE_SERVER_BASE_URI}/blogs?page=1`
        );
        if (response.status === 200) {
          dispatch({
            type: actionTypes.blog.FETCH_SUCCESS,
            payload: response.data,
          });
        }
      } catch (error) {
        dispatch({
          type: actionTypes.blog.FETCH_FAILURE,
          payload:
            error?.response?.data?.error ||
            'Unknown error while fetching blog data',
        });
      }
    };
    fetchBlogs();
  }, []);

  if (state?.loading) {
    return <div>Loading ...</div>;
  }
  if (state?.error) {
    return <div>Error fetching...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
      <div className="space-y-3 md:col-span-5">
        {/* <!-- Blog Card Start --> */}
        {/* <div className="blog-card">
          <img
            className="blog-thumb"
            src="./assets/blogs/React-Roadmap.jpg"
            alt=""
          />
          <div className="mt-2 relative">
            <a href="./single-blog.html">
              <h3 className="text-slate-300 text-xl lg:text-2xl">
                <a href="./single-blog.html">React Roadmap in 2024</a>
              </h3>
            </a>
            <p className="mb-6 text-base text-slate-500 mt-1">
              Aenean eleifend ante maecenas pulvinar montes lorem et
              pede dis dolor pretium donec dictum. Vici consequat
              justo enim. Venenatis eget adipiscing luctus lorem.
            </p>

            <div className="flex justify-between items-center">
              <div className="flex items-center capitalize space-x-2">
                <div className="avater-img bg-indigo-600 text-white">
                  <span className="">S</span>
                </div>

                <div>
                  <h5 className="text-slate-500 text-sm">
                    <a href="./profile.html">Saad Hasan</a>
                  </h5>
                  <div className="flex items-center text-xs text-slate-700">
                    <span>June 28, 2018</span>
                  </div>
                </div>
              </div>

              <div className="text-sm px-2 py-1 text-slate-700">
                <span>100 Likes</span>
              </div>
            </div>

            <div className="absolute right-0 top-0">
              <button>
                <img
                  src="./assets/icons/3dots.svg"
                  alt="3dots of Action"
                />
              </button>

              <div className="action-modal-container">
                <button className="action-menu-item hover:text-lwsGreen">
                  <img src="./assets/icons/edit.svg" alt="Edit" />
                  Edit
                </button>
                <button className="action-menu-item hover:text-red-500">
                  <img src="./assets/icons/delete.svg" alt="Delete" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div> */}

        {blogs.length > 0 ? (
          blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <EmptyBlog />
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

        <div className="sidebar-card">
          <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
            Your Favourites ❤️
          </h3>

          <ul className="space-y-5 my-5">
            <li>
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                How to Auto Deploy a Next.js App on Ubuntu from GitHub
              </h3>
              <p className="text-slate-600 text-sm">
                #tailwindcss, #server, #ubuntu
              </p>
            </li>

            <li>
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                How to Auto Deploy a Next.js App on Ubuntu from GitHub
              </h3>
              <p className="text-slate-600 text-sm">
                #tailwindcss, #server, #ubuntu
              </p>
            </li>

            <li>
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                How to Auto Deploy a Next.js App on Ubuntu from GitHub
              </h3>
              <p className="text-slate-600 text-sm">
                #tailwindcss, #server, #ubuntu
              </p>
            </li>

            <li>
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                How to Auto Deploy a Next.js App on Ubuntu from GitHub
              </h3>
              <p className="text-slate-600 text-sm">
                #tailwindcss, #server, #ubuntu
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
