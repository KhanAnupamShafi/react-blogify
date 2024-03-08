import { actionTypes } from '.';

const initialState = {
  blogs: [],
  blog: {},
  loading: false,
  error: null,
};

const blogReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.blog.FETCH_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case actionTypes.blog.CREATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        blog: { ...action.payload },
        blogs: [...state.blogs, action.payload],
      };
    }
    case actionTypes.blog.UPDATE_SUCCESS: {
      const updatedBlog = action.payload;
      const index = state.blogs.findIndex((blog) => blog.id === updatedBlog.id);
      // Replace the old blog with the updated one
      const updatedBlogs = [...state.blogs];
      updatedBlogs[index] = updatedBlog;
      return {
        ...state,
        loading: false,
        error: null,
        blog: updatedBlog,
        blogs: updatedBlogs,
      };
    }
    case actionTypes.blog.DELETE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        blogs: state.blogs.filter((blog) => blog.id !== action.payload),
      };
    }
    case actionTypes.blog.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        blogs: action.payload,
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
        blog: { ...action.payload },
      };
    }
    case actionTypes.blog.RESET_BLOG: {
      return {
        ...state,
        blog: {},
      };
    }
    default:
      return state;
  }
};

export { blogReducer, initialState };
