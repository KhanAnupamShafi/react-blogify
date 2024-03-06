import { useState } from 'react';
import CheckSVG from '../../assets/icons/check.svg';
import EditSVG from '../../assets/icons/edit.svg';
import { useAxios } from '../../hooks/useAxios';
import { useProfileContext } from '../../hooks/useProfileContext';
import { actionTypes } from '../../reducers';
const AuthorBio = () => {
  const { state, dispatch } = useProfileContext();
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(state?.user?.bio);
  const { api } = useAxios();

  const handleBioEdit = async () => {
    dispatch({ type: actionTypes.profile.FETCH_REQUEST });
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URI}/profile`,
        { bio }
      );

      if (response.status === 200) {
        dispatch({
          type: actionTypes.profile.UPDATE_SUCCESS,
          payload: response.data,
        });
        setEditMode(false);
      }
    } catch (error) {
      console.log(error?.response?.data?.error, 'errors');

      dispatch({
        type: actionTypes.profile.FETCH_FAILURE,
        payload:
          error?.response?.data?.error ||
          `Unknown error while updating profile - ${error?.response?.status} ` +
            error?.response?.statusText,
      });
    }
  };
  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state?.user?.bio.length > 0 ? (
              state?.user?.bio
            ) : (
              <span className="italic">&ldquo; Write your Bio &ldquo; </span>
            )}
          </p>
        ) : (
          <textarea
            className='p-2 className="leading-[188%] text-gray-600 lg:text-lg rounded-md'
            cols="60"
            rows="4"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>
      {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}
      {!editMode ? (
        <button
          onClick={() => setEditMode(true)}
          className="flex-center h-7 w-7 rounded-full">
          <img src={EditSVG} alt="Edit" />
        </button>
      ) : (
        <button
          onClick={handleBioEdit}
          className="flex-center h-7 w-7 rounded-full">
          <img src={CheckSVG} alt="Edit" />
        </button>
      )}
    </div>
  );
};

export default AuthorBio;
