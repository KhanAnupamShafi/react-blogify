import { useCallback, useEffect, useState } from 'react';
import LikeFilledIcon from '../../assets/icons/like-filled.svg';
import LikeSVG from '../../assets/icons/like.svg';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useAxios } from '../../hooks/useAxios';
import useReactPortal from '../../hooks/useReactPortal';
import Modal from '../modal/Modal';
import AuthNotification from '../shared/AuthNotification';

const BlogLike = ({ blogId = '', initialLikes = [] }) => {
  const [likes, setLikes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
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
    if (!userId) {
      setOpenModal(true);
      return;
    }
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

  const portal = useReactPortal(
    <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
      <AuthNotification onClose={() => setOpenModal(false)} />
    </Modal>
  );
  return (
    <>
      {!userId && portal}
      <button className="flex place-items-center gap-1" onClick={handleLike}>
        <img src={liked ? LikeFilledIcon : LikeSVG} alt="like" />
        <span>{likes?.length}</span>
      </button>
    </>
  );
};

export default BlogLike;
