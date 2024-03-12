import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../api/axiosInstance';
import AuthorBlogs from '../components/author/AuthorBlogs';
import AuthorInfo from '../components/author/AuthorInfo';
import PreLoader from '../components/loader/PreLoader';
import { useAuthContext } from '../hooks/useAuthContext';
import { useProfileContext } from '../hooks/useProfileContext';
import { actionTypes } from '../reducers';

const ProfilePage = () => {
  const { state, dispatch } = useProfileContext();
  const { auth } = useAuthContext();
  const { profileId } = useParams();
  const userId = profileId ?? auth?.user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user?.id === profileId) navigate('/profile');
  }, [auth?.user?.id, profileId, navigate]);
  useEffect(() => {
    dispatch({ type: actionTypes.profile.FETCH_REQUEST });

    const fetchProfileData = async () => {
      try {
        const response = await instance.get(
          `${import.meta.env.VITE_SERVER_BASE_URI}/profile/${userId}`
        );

        if (response.status === 200) {
          if (profileId) {
            dispatch({
              type: actionTypes.profile.FETCH_AUTHOR_SUCCESS,
              payload: response.data,
            });
          } else {
            dispatch({
              type: actionTypes.profile.FETCH_SUCCESS,
              payload: response.data,
            });
          }
        }
      } catch (error) {
        console.log(error?.response?.data?.error, 'errors');
        dispatch({
          type: actionTypes.profile.FETCH_FAILURE,
          payload:
            error?.response?.data?.error ||
            'Unknown error while fetching profile data',
        });
      }
    };
    fetchProfileData();
  }, [profileId, userId, dispatch]);

  if (state?.loading) {
    return <PreLoader when={true} />;
  }
  if (state?.error) {
    return <div>{state.error}</div>;
  }
  return (
    <div className="mx-auto max-w-[1020px] py-8">
      <AuthorInfo />

      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
      <AuthorBlogs />
    </div>
  );
};

export default ProfilePage;
