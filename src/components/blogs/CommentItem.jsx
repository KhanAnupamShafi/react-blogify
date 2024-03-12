import { Link } from 'react-router-dom';
import DeleteSVG from '../../assets/icons/delete.svg';
import { useAuthContext } from '../../hooks/useAuthContext';
const CommentItem = ({ comment = {}, profileAvatar, onDelete }) => {
  const { auth } = useAuthContext();
  let avatar;
  const isMyComment = comment.author.id === auth?.user?.id;
  if (isMyComment) {
    avatar = profileAvatar;
  } else {
    avatar = comment?.author?.avatar;
  }

  return (
    <div className="flex items-start space-x-4 my-8">
      {avatar ? (
        <Link
          to={`/profile/${comment?.author?.id}`}
          className="avater-img bg-orange-600 text-white max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]">
          <img
            className="rounded-full overflow-hidden w-full h-full"
            src={`${
              import.meta.env.VITE_SERVER_BASE_URI
            }/uploads/avatar/${avatar}`}
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

      <div className="">
        <Link to={`/profile/${comment?.author?.id}`}>
          <h5 className="text-slate-500 font-bold">
            {comment?.author?.firstName} {comment?.author?.lastName}
          </h5>
        </Link>
        <p className="text-slate-300">{comment?.content}</p>
      </div>
      {isMyComment && (
        <div className="flex">
          ({' '}
          <img
            onClick={() => onDelete(comment?.id)}
            src={DeleteSVG}
            alt="deleting comment"
            className="cursor-pointer"
          />
          )
        </div>
      )}
    </div>
  );
};

export default CommentItem;
