import { actionTypes } from '.';

const initialState = {
  loading: false,
  blogs: [],
  favourites: [],
  user: null,
  error: null,
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.profile.FETCH_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case actionTypes.profile.FETCH_SUCCESS: {
      const { blogs, favourites, ...user } = action.payload || {};

      return {
        ...state,
        user: user,
        blogs: blogs,
        favourites: favourites,
        loading: false,
        error: null,
      };
    }
    case actionTypes.profile.UPDATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload.user,
      };
    }
    case actionTypes.profile.UPDATE_AVATAR_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        user: {
          ...state.user,
          avatar: action.payload?.avatar,
        },
      };
    }
    case actionTypes.profile.FETCH_FAILURE: {
      return { ...state, loading: false, error: action.payload };
    }

    default:
      return state;
  }
};

export { initialState, profileReducer };
