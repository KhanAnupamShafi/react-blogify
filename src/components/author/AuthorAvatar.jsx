import { useRef } from 'react';
import EditSVG from '../../assets/icons/edit.svg';
import { useAxios } from '../../hooks/useAxios';
import { useProfileContext } from '../../hooks/useProfileContext';
import { actionTypes } from '../../reducers';

const AuthorAvatar = () => {
  const { state, dispatch } = useProfileContext();
  const fileUploadRef = useRef();
  const { api } = useAxios();
  const handleImageUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.addEventListener('change', updateImageDisplay);

    fileUploadRef.current.click();
  };

  const updateImageDisplay = async () => {
    dispatch({ type: actionTypes.profile.FETCH_REQUEST });

    try {
      const formData = new FormData();

      for (const file of fileUploadRef.current.files) {
        formData.append('avatar', file);
      }

      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URI}/profile/avatar`,
        formData
      );
      if (response.status === 200) {
        dispatch({
          type: actionTypes.profile.UPDATE_AVATAR_SUCCESS,
          payload: response.data?.user,
        });
      }
    } catch (error) {
      console.log(error, 'errors');

      dispatch({
        type: actionTypes.profile.FETCH_FAILURE,
        payload:
          error?.response?.data?.message ||
          'Unknown error while fetching profile data',
      });
    }
  };

  const profileAvatar = state?.author?.avatar ?? state?.user?.avatar;
  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px] bg-orange-300">
      {profileAvatar ? (
        <div className="h-[120px] w-[120px]">
          <img
            className="w-full h-full rounded-full"
            src={`${
              import.meta.env.VITE_SERVER_BASE_URI
            }/uploads/avatar/${profileAvatar}`}
            alt={state?.user?.firstName}
          />
        </div>
      ) : (
        <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
          <span className="capitalize">{state?.user?.firstName[0]}</span>
        </div>
      )}
      <form id="form" encType="multipart/form-data">
        <button
          type="submit"
          onClick={handleImageUpload}
          className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80">
          <img src={EditSVG} alt="Edit" />
        </button>
        <input type="file" name="" ref={fileUploadRef} hidden />
      </form>
    </div>
  );
};

export default AuthorAvatar;
