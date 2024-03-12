import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useAxios } from '../../hooks/useAxios';
import { useProfileContext } from '../../hooks/useProfileContext';
import CommentItem from './CommentItem';

const BlogComments = ({
  blogId = '',
  comments = [],
  setComments,
  onDelete,
}) => {
  const { auth } = useAuthContext();
  const { state } = useProfileContext();
  const { api } = useAxios();
  const user = auth?.user;
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const addComment = async () => {
    if (!user?.id) {
      navigate('/login');
      return;
    }
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
  const profileAvatar =
    state?.author?.avatar ?? state?.user?.avatar ?? user?.avatar;
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
                src={`${
                  import.meta.env.VITE_SERVER_BASE_URI
                }/uploads/avatar/${profileAvatar}`}
                alt="avatar"
              />
            </Link>
          ) : (
            <Link
              to={'/profile'}
              className={`avater-img bg-indigo-600 text-white ${
                !user?.id && 'invisible'
              }`}>
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
                title={!user?.id && 'please login to comment'}
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
            <CommentItem
              key={comment.id}
              comment={comment}
              profileAvatar={profileAvatar}
              onDelete={onDelete}
            />
          ))}
      </div>
    </section>
  );
};

export default BlogComments;
