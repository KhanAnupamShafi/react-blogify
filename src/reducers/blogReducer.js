import { actionTypes } from '.';

const initialState = {
  blogs: [],
  blog: null,
  loading: false,
  error: null,
};

const blogReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.blog.FETCH_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case actionTypes.blog.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        blogs: action.payload.blogs,
      };
    }
    case actionTypes.blog.FETCH_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case actionTypes.blog.FETCH_SINGLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        blog: action.payload,
      };
    }
    default:
      return state;
  }
};

export { blogReducer, initialState };
