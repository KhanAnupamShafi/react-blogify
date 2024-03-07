import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import BlogActions from '../components/blogs/BlogActions';
import BlogComments from '../components/blogs/BlogComments';
import BlogContents from '../components/blogs/BlogContents';
import { useAxios } from '../hooks/useAxios';
import { actionTypes } from '../reducers';
import { blogReducer, initialState } from '../reducers/blogReducer';
const BlogDetailPage = () => {
  const { blogId } = useParams();
  const { api } = useAxios();
  const [state, dispatch] = useReducer(blogReducer, initialState);
  console.log(state);
  useEffect(() => {
    dispatch({ type: actionTypes.blog.FETCH_REQUEST });
    const fetchSingleBlog = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URI}/blogs/${blogId}`
        );
        if (response.status === 200) {
          dispatch({
            type: actionTypes.blog.FETCH_SINGLE_SUCCESS,
            payload: response.data,
          });
        }
      } catch (error) {
        dispatch({
          type: actionTypes.profile.FETCH_FAILURE,
          payload: error?.response?.data?.error || 'This Blog is not available',
        });
      }
    };
    fetchSingleBlog();
  }, [blogId, dispatch, api]);

  return (
    <>
      <BlogContents blog={state?.blog} />
      <BlogComments comments={state?.blog?.comments} />
      <BlogActions />
    </>
  );
};

export default BlogDetailPage;
