import { useCallback, useEffect, useState } from 'react';
import HeartFilledSVG from '../../assets/icons/heart-filled.svg';
import HeartSVG from '../../assets/icons/heart.svg';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useAxios } from '../../hooks/useAxios';
import useReactPortal from '../../hooks/useReactPortal';
import Modal from '../modal/Modal';
import AuthNotification from '../shared/AuthNotification';

const BlogFavourite = ({ isFavouriteProp, blogId }) => {
  const [favourited, setFavourited] = useState(false);
  const { api } = useAxios();
  const [openModal, setOpenModal] = useState(false);
  const { auth } = useAuthContext();
  const userId = auth?.user?.id;
  const getFavouriteStatus = useCallback(() => {
    return isFavouriteProp;
  }, [isFavouriteProp]);

  useEffect(() => {
    if (!userId) {
      setFavourited(false);
      return;
    }

    const isFavourite = getFavouriteStatus();
    setFavourited(isFavourite);
  }, [getFavouriteStatus, userId]);

  const handleFavourite = async () => {
    if (!userId) {
      setOpenModal(true);
      return;
    }
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URI}/blogs/${blogId}/favourite`
      );

      if (response.status === 200) {
        const { isFavourite } = response.data;

        // Update favourited state based on the response
        setFavourited(isFavourite);
      }
    } catch (error) {
      console.error(error);
      setFavourited(false);
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

      <button
        className="flex place-items-center gap-1"
        onClick={handleFavourite}>
        <img src={favourited ? HeartFilledSVG : HeartSVG} alt="favourite" />
      </button>
    </>
  );
};

export default BlogFavourite;
