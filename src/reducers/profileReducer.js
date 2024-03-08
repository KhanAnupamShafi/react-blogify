import { actionTypes } from '.';

const initialState = {
  loading: false,
  blogs: [],
  favourites: [],
  user: null,
  author: null,
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
        author: null,
        user: user,
        blogs: blogs,
        favourites: favourites,
        loading: false,
        error: null,
      };
    }

    case actionTypes.profile.FETCH_AUTHOR_SUCCESS: {
      const { blogs, favourites, ...user } = action.payload || {};
      return {
        ...state,
        author: user,
        blogs: blogs,
        favourites: favourites,
        // user: null,
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
      const storedAuth = JSON.parse(localStorage.getItem('auth'));

      // Update avatar property in the user object within the auth object
      const updatedAuth = {
        ...storedAuth,
        user: {
          ...storedAuth.user,
          avatar: action.payload?.avatar,
        },
      };

      localStorage.setItem('auth', JSON.stringify(updatedAuth));

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
    case actionTypes.profile.UPDATE_AFTER_BLOG_DELETION: {
      return {
        ...state,

        blogs: [...action.payload.blogs],
        loading: false,
        error: null,
      };
    }

    default:
      return state;
  }
};

export { initialState, profileReducer };
