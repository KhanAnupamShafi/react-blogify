import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditSVG from '../../assets/icons/edit.svg';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useAxios } from '../../hooks/useAxios';
import { useProfileContext } from '../../hooks/useProfileContext';
import { actionTypes } from '../../reducers';
import PreLoader from '../loader/PreLoader';

const AuthorAvatar = () => {
  const { state, dispatch } = useProfileContext();
  const { auth } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileUploadRef = useRef();
  const { api } = useAxios();
  const handleImageUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.addEventListener('change', updateImageDisplay);

    fileUploadRef.current.click();
  };
  const navigate = useNavigate();

  const updateImageDisplay = async () => {
    setIsSubmitting(true);
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
        setTimeout(() => {
          setIsSubmitting(false);
          dispatch({
            type: actionTypes.profile.UPDATE_AVATAR_SUCCESS,
            payload: response.data?.user,
          });
          navigate(`/profile`);
        }, 700);
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
  const isMe = auth?.user?.id === state?.author?.id;
  const profileAvatar = state?.author?.avatar ?? state?.user?.avatar;
  if (isSubmitting) {
    return <PreLoader when={true} />;
  }
  console.log(profileAvatar);
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
      {(isMe || location.pathname === '/profile') && (
        <form id="form" encType="multipart/form-data">
          <button
            type="submit"
            onClick={handleImageUpload}
            className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80">
            <img src={EditSVG} alt="Edit" />
          </button>

          <input type="file" name="" ref={fileUploadRef} hidden />
        </form>
      )}
    </div>
  );
};

export default AuthorAvatar;
