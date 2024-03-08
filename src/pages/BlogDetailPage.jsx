import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogActions from '../components/blogs/BlogActions';
import BlogComments from '../components/blogs/BlogComments';
import BlogContents from '../components/blogs/BlogContents';
import { useAxios } from '../hooks/useAxios';
import { useBlogContext } from '../hooks/useBlogContext';
import { actionTypes } from '../reducers';
const BlogDetailPage = () => {
  const { state, dispatch } = useBlogContext();

  const { blogId } = useParams();
  const { api } = useAxios();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(state?.blog?.comments);
  }, [state?.blog?.comments]);

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
        console.log(error, 'blog detail page');
      }
    };
    fetchSingleBlog();
  }, [blogId, dispatch, api]);

  if (state?.loading) {
    return <div>Loading ...</div>;
  }
  if (state?.error) {
    return <div>Error fetching in Blog Detail...</div>;
  }

  return (
    <>
      <BlogContents blog={state?.blog} />
      <BlogComments
        blogId={state?.blog?.id}
        comments={comments}
        setComments={setComments}
      />
      <BlogActions
        blogId={state?.blog?.id}
        initialLikes={state?.blog?.likes}
        comments={comments}
        isFavourite={state?.blog?.isFavourite}
      />
    </>
  );
};

export default BlogDetailPage;
