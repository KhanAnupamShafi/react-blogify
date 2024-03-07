import { useCallback, useEffect, useState } from 'react';
import HeartFilledSVG from '../../assets/icons/heart-filled.svg';
import HeartSVG from '../../assets/icons/heart.svg';
import { useAxios } from '../../hooks/useAxios';

const BlogFavourite = ({ isFavouriteProp, blogId }) => {
  const [favourited, setFavourited] = useState(false);
  const { api } = useAxios();
  //   const { auth } = useAuthContext();

  //   const userId = auth?.user?.id;

  const getFavouriteStatus = useCallback(() => {
    return isFavouriteProp;
  }, [isFavouriteProp]);

  useEffect(() => {
    const isFavourite = getFavouriteStatus();
    setFavourited(isFavourite);
  }, [getFavouriteStatus]);

  const handleFavourite = async () => {
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

  return (
    <>
      <button
        className="flex place-items-center gap-1"
        onClick={handleFavourite}>
        <img src={favourited ? HeartFilledSVG : HeartSVG} alt="favourite" />
      </button>
    </>
  );
};

export default BlogFavourite;
