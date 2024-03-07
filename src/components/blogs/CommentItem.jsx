import { Link } from 'react-router-dom';

const CommentItem = ({ comment = {} }) => {
  console.log(comment);
  return (
    <div className="flex items-start space-x-4 my-8">
      {comment?.author?.avatar ? (
        <Link
          to={`/profile/${comment?.author?.id}`}
          className="avater-img bg-orange-600 text-white max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]">
          <img
            className="rounded-full overflow-hidden w-full h-full"
            src={`${import.meta.env.VITE_SERVER_BASE_URI}/uploads/avatar/${
              comment.author.avatar
            }`}
            alt="avatar"
          />
        </Link>
      ) : (
        <Link
          to={`/profile/${comment?.author?.id}`}
          className="avater-img bg-orange-600 text-white">
          <span className="capitalize">{comment?.author?.firstName[0]}</span>
        </Link>
      )}

      <div className="w-full">
        <Link to={`/profile/${comment?.author?.id}`}>
          <h5 className="text-slate-500 font-bold">
            {comment?.author?.firstName} {comment?.author?.lastName}
          </h5>
        </Link>
        <p className="text-slate-300">{comment?.content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
