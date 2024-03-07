import CommentSVG from '../../assets/icons/comment.svg';
import BlogFavourite from './BlogFavourite';

import BlogLike from './BlogLike';

const BlogActions = ({
  blogId,
  initialLikes = [],
  comments = [],
  isFavourite,
}) => {
  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          <BlogLike blogId={blogId} initialLikes={initialLikes} />
        </li>

        <li>
          {/* <!-- There is heart-filled.svg in the icons folder --> */}
          <BlogFavourite isFavouriteProp={isFavourite} blogId={blogId} />
        </li>
        <a href="#comments">
          <li>
            <img src={CommentSVG} alt="Comments" />
            <span>{comments?.length}</span>
          </li>
        </a>
      </ul>
    </div>
  );
};

export default BlogActions;
