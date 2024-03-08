import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import InputField from '../components/shared/InputField';
import TextAreaField from '../components/shared/TextAreaField';
import { useAxios } from '../hooks/useAxios';
import { useBlogContext } from '../hooks/useBlogContext';
import { actionTypes } from '../reducers';
const CreateBlogPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useBlogContext();
  const { api } = useAxios();

  const fileUploadRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  //   const user = profile?.user ?? auth?.user;
  // Determine if we are in edit mode
  const isEditMode = location.pathname === '/edit-blog';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: isEditMode
      ? {
          title: state?.blog?.title ?? '',
          tags: state?.blog?.tags ?? '',
          content: state?.blog?.content ?? '',
        }
      : {},
  });

  // Reset the form when transitioning from edit mode to create mode within the same component
  useEffect(() => {
    if (!isEditMode) {
      reset({ title: '', tags: '', content: '' });
    }
  }, [isEditMode, reset]);

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (fileUploadRef.current) {
      fileUploadRef.current.addEventListener('change', updateImageDisplay);
      fileUploadRef.current.click();
    }
  };

  const updateImageDisplay = async () => {
    const file = fileUploadRef.current.files[0];

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const removeImage = () => {
    setSelectedImage(null);
    // Clear the file input value
    fileUploadRef.current.value = '';
  };

  // post blog entry
  const onSubmit = async (formData) => {
    dispatch({ type: actionTypes.blog.FETCH_REQUEST });

    const formDataToSend = new FormData();
    if (selectedImage) {
      formDataToSend.append('thumbnail', fileUploadRef.current.files[0]);
    }

    // Append each form field to formDataToSend
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      let response;

      if (isEditMode) {
        response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URI}/blogs/${state?.blog?.id}`,
          formDataToSend
        );
      } else {
        response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URI}/blogs`,
          formDataToSend
        );
      }

      if (response.status === 201) {
        dispatch({
          type: actionTypes.blog.CREATE_SUCCESS,
          payload: response?.data?.blog,
        });
        reset();

        setTimeout(() => {
          navigate(`/blog/${response?.data?.blog?.id}`);
        }, 700);
      }
      if (response.status === 200) {
        dispatch({
          type: actionTypes.blog.UPDATE_SUCCESS,
          payload: response?.data,
        });

        setTimeout(() => {
          navigate(`/blog/${response?.data?.id}`);
        }, 700);
      }
    } catch (error) {
      console.log(error, 'create blog page');

      const errorMessage =
        error?.response?.data?.error ||
        'Blog post was unsuccessful - ' +
          error?.response?.status +
          ' ' +
          error?.response?.statusText;
      dispatch({
        type: actionTypes.blog.FETCH_FAILURE,
        payload: errorMessage,
      });
    }
  };

  if (state?.loading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="min-h-[calc(100vh-220px)]">
      {(selectedImage || isEditMode) && (
        <div className="mt-4">
          <h1 className="mb-3 text-center font-semibold sm:text-lg text-gray-300">
            To Upload
          </h1>

          <ul
            id="gallery"
            className="flex flex-1 flex-wrap -m-1 justify-center">
            <li
              id="empty"
              className="h-full w-32 text-center flex flex-col items-center justify-center group relative hover:bg-gray-50 hover:bg-opacity-30 rounded-md">
              <img
                className=" mx-auto w-full max-w-[200px] max-h-[200px] object-cover rounded-md group-hover:opacity-40 transition-opacity"
                src={
                  selectedImage ??
                  `${import.meta.env.VITE_SERVER_BASE_URI}/uploads/blog/${
                    state?.blog?.thumbnail
                  }`
                }
                alt="Selected thumbnail"
              />
              <section
                className="flex flex-col rounded-md text-xs break-words w-full h-full absolute top-0 py-2 px-3 "
                onClick={handleImageUpload}>
                <h1 className="flex-1"></h1>
                <div className="flex">
                  <p className="p-1 size text-xs"></p>
                  <button
                    onClick={removeImage}
                    className="ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md group-hover:block hidden">
                    <svg
                      className="pointer-events-none fill-current w-4 h-4 ml-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24">
                      <path
                        className="pointer-events-none"
                        d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                      />
                    </svg>
                  </button>
                </div>
              </section>
            </li>
          </ul>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="createBlog">
        {!selectedImage && (
          <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
            <button
              onClick={handleImageUpload}
              className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <p>Upload Your Image</p>
            </button>
          </div>
        )}
        <input
          hidden
          type="file"
          ref={fileUploadRef}
          name="thumbnail"
          className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <InputField
          placeholder="Enter your blog title"
          label=""
          type="text"
          name="title"
          register={register}
          errors={errors.title}
          rules={{
            required: `Title is Required`,
          }}
          className="mb-0"
          //   defaultValue={!isEditMode ? '' : state?.blog?.title}
        />
        <InputField
          placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
          label=""
          type="text"
          name="tags"
          register={register}
          errors={errors.tags}
          rules={{
            required: `Tags are Required`,
          }}
          className="mb-0"
          //   defaultValue={!isEditMode ? '' : state?.blog?.tags}
        />
        <TextAreaField
          placeholder="Write your blog content"
          label=""
          name="content"
          register={register}
          errors={errors.content}
          rules={{
            required: `Contents are Required`,
          }}
          rows="8"
          className="mb-0"
          //   defaultValue={!isEditMode ? '' : state?.blog?.content}
        />
        {errors?.root?.serverError && (
          <p role="alert" className="my-2 text-sm text-red-600">
            {errors.root.serverError.message}
          </p>
        )}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
          {!isEditMode ? 'Create' : 'Edit'} Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
