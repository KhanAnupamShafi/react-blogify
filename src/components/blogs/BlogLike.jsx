import { useCallback, useEffect, useState } from 'react';
import LikeFilledIcon from '../../assets/icons/like-filled.svg';
import LikeSVG from '../../assets/icons/like.svg';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useAxios } from '../../hooks/useAxios';

const BlogLike = ({ blogId = '', initialLikes = [] }) => {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const { api } = useAxios();
  const { auth } = useAuthContext();

  const userId = auth?.user?.id;

  /**
   * ToDO Fix:Warning: Maximum update depth exceeded.
   */
  const getLikes = useCallback(() => {
    return initialLikes;
  }, [initialLikes]);

  useEffect(() => {
    const data = getLikes();
    setLikes([...data]);
    setLiked(data.some((user) => user?.id === userId));
  }, [getLikes, userId]);

  const handleLike = async () => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URI}/blogs/${blogId}/like`
      );

      if (response.status === 200) {
        const { isLiked, likes: updatedLikes } = response.data;

        // Update likes and liked state based on the response
        setLikes(updatedLikes);
        setLiked(isLiked);
      }
    } catch (error) {
      console.error(error);
      setLiked(false);
    }
  };
  return (
    <button className="flex place-items-center gap-1" onClick={handleLike}>
      <img src={liked ? LikeFilledIcon : LikeSVG} alt="like" />
      <span>{likes?.length}</span>
    </button>
  );
};

export default BlogLike;
