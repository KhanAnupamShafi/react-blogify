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

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await api.delete(
        `${
          import.meta.env.VITE_SERVER_BASE_URI
        }/blogs/${blogId}/comment/${commentId}`
      );
      if (response.status === 204 || response.status === 200) {
        // Remove the deleted comment from the state
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      }
    } catch (error) {
      console.log(error);
      // Handle error if deletion fails
    }
  };

  if (state?.loading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <BlogContents blog={state?.blog} />
      <BlogComments
        blogId={state?.blog?.id}
        comments={comments}
        setComments={setComments}
        onDelete={handleDeleteComment}
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
