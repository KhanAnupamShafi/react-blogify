import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DotSVG from '../../assets/icons/3dots.svg';
import DeleteSVG from '../../assets/icons/delete.svg';
import EditSVG from '../../assets/icons/edit.svg';
import { useAvatar } from '../../hooks/useAavatar';
import { useAxios } from '../../hooks/useAxios';
import { useBlogContext } from '../../hooks/useBlogContext';
import { useCheckAuthor } from '../../hooks/useCheckAuthor';
import { useProfileContext } from '../../hooks/useProfileContext';
import useReactPortal from '../../hooks/useReactPortal';
import { actionTypes } from '../../reducers';
import { getFormattedDate, getPreviewContent } from '../../utils';
import Modal from '../modal/Modal';
import Alert from '../shared/Alert';

const BlogCard = ({ blog }) => {
  const [showActionDot, setShowActionDot] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { avatarUrl } = useAvatar(blog);
  const navigate = useNavigate();
  const { hasPermission } = useCheckAuthor(blog);
  const { dispatch } = useBlogContext();
  const { state: profileState, dispatch: profileDispatch } =
    useProfileContext();
  const { api } = useAxios();

  const navigateToBlog = (e) => {
    e.stopPropagation();
    navigate(`/blog/${blog?.id}`);
  };

  const navigateToProfile = (e) => {
    e.stopPropagation();
    navigate(`/profile/${blog?.author?.id}`);
  };

  // Delete blog
  const handleDeleteTask = async () => {
    console.log('asdg');
    dispatch({ type: actionTypes.blog.FETCH_REQUEST });

    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URI}/blogs/${blog?.id}`
      );
      if (response.status === 200) {
        dispatch({
          type: actionTypes.blog.DELETE_SUCCESS,
          payload: blog.id,
        });
        // If the blog is successfully deleted, dispatch an action to update the profile context
        const updatedProfileData = {
          blogs: profileState?.blogs?.filter((b) => b.id !== blog.id),
        };
        profileDispatch({
          type: actionTypes.profile.UPDATE_AFTER_BLOG_DELETION,
          payload: updatedProfileData,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.blog.FETCH_FAILURE,
        payload:
          error.response.data.error ||
          `${error.response.status} ${error.response.statusText}`,
      });
    }
  };

  // Edit blog
  const handleEditBlog = async (e) => {
    e.stopPropagation();

    await dispatch({
      type: actionTypes.blog.FETCH_SINGLE_SUCCESS,
      payload: blog,
    });
    navigate('/edit-blog');
  };
  const portal = useReactPortal(
    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
      <Alert onClose={() => setModalOpen(false)} onDelete={handleDeleteTask} />
    </Modal>
  );
  return (
    <motion.div {...animation} onClick={navigateToBlog} key={blog?.id}>
      <div className="blog-card">
        <div className="max-w-[340px]">
          <img
            className="blog-thumb"
            src={`${import.meta.env.VITE_SERVER_BASE_URI}/uploads/blog/${
              blog?.thumbnail
            }`}
            alt="blog thumbnail"
          />
        </div>
        <div className="mt-2 relative">
          <h3 className="text-slate-300 text-xl lg:text-2xl">{blog?.title}</h3>
          <p className="mb-6 text-base text-slate-500 mt-1">
            {getPreviewContent(blog?.content)}
          </p>

          <div className="flex justify-between items-center">
            <div className="flex items-center capitalize space-x-2">
              {!avatarUrl.includes('/null') && avatarUrl ? (
                <div
                  onClick={(e) => navigateToProfile(e)}
                  className="avater-img bg-orange-600 text-white max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]">
                  <img
                    className="rounded-full overflow-hidden w-full h-full"
                    src={avatarUrl}
                    alt="avatar"
                  />
                </div>
              ) : (
                <div
                  onClick={navigateToProfile}
                  to={'/profile'}
                  className="avater-img bg-indigo-600 text-white">
                  <span className="">{blog?.author?.firstName[0]}</span>
                </div>
              )}

              <div onClick={navigateToProfile}>
                <h5 className="text-slate-500 text-sm">
                  {blog?.author?.firstName} {blog?.author?.lastName}{' '}
                </h5>
                <div className="flex items-center text-xs text-slate-700">
                  <span>{getFormattedDate(blog?.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="text-sm px-2 py-1 text-slate-700">
              {blog?.likes.length === 0 ? (
                <span>No Likes</span>
              ) : (
                <span>
                  {blog?.likes.length}{' '}
                  {blog?.likes.length === 1 ? 'Like' : 'Likes'}
                </span>
              )}
            </div>
          </div>
          {hasPermission && (
            <div
              className="absolute right-0 top-0"
              onClick={(e) => {
                e.stopPropagation();
                setShowActionDot((prev) => !prev);
              }}>
              <button>
                <img src={DotSVG} alt="3dots of Action" />
              </button>

              {/* <!-- Action Menus Popup --> */}
              {showActionDot && (
                <div className="action-modal-container">
                  <button
                    onClick={(e) => handleEditBlog(e)}
                    className="action-menu-item hover:text-lwsGreen">
                    <img src={EditSVG} alt="Edit" />
                    Edit
                  </button>
                  <button
                    // onClick={(e) => handleDeleteTask(e)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalOpen(true);
                    }}
                    className="action-menu-item hover:text-red-500">
                    <img src={DeleteSVG} alt="Delete" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
          {portal}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;

const animation = {
  initial: { y: '50%', opacity: 0, scale: 0.5 },
  animate: { y: 0, opacity: 1, scale: 1 },
  exit: { y: '-50%', opacity: 0, transition: { duration: 0.1 } },
  transition: { duration: 0.2, ease: 'easeOut' },
};
