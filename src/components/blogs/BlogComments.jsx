import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useAxios } from '../../hooks/useAxios';
import CommentItem from './CommentItem';

const BlogComments = ({ blogId = '', comments = [], setComments }) => {
  const { auth } = useAuthContext();
  const { api } = useAxios();
  const user = auth?.user;

  const [comment, setComment] = useState('');
  const addComment = async () => {
    if (comment.length > 0) {
      try {
        const response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URI}/blogs/${blogId}/comment`,
          { content: comment }
        );
        if (response.status === 200) {
          setComments([...response.data.comments]);
          setComment('');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">
          Comments ({comments?.length})
        </h2>
        <div className="flex items-start space-x-4">
          {user?.avatar ? (
            <Link
              to={'/profile'}
              className="avater-img bg-orange-600 text-white max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]">
              <img
                className="rounded-full overflow-hidden w-full h-full"
                src={`${import.meta.env.VITE_SERVER_BASE_URI}/uploads/avatar/${
                  user.avatar
                }`}
                alt="avatar"
              />
            </Link>
          ) : (
            <Link
              to={'/profile'}
              className="avater-img bg-indigo-600 text-white">
              <span className="capitalize">{user?.firstName[0]}</span>
            </Link>
          )}

          <div className="w-full">
            <textarea
              className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={addComment}
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                Comment
              </button>
            </div>
          </div>
        </div>

        {comments
          ?.slice()
          .reverse()
          .map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
      </div>
    </section>
  );
};

export default BlogComments;
