// import HeartFilledSVG from '../../assets/icons/heart-filled.svg'
import CommentSVG from '../../assets/icons/comment.svg';
import HeartSVG from '../../assets/icons/heart.svg';
import LikeSVG from '../../assets/icons/like.svg';
const BlogActions = () => {
  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          <img src={LikeSVG} alt="like" />
          <span>10</span>
        </li>

        <li>
          {/* <!-- There is heart-filled.svg in the icons folder --> */}
          <img src={HeartSVG} alt="Favourite" />
        </li>
        <a href="#comments">
          <li>
            <img src={CommentSVG} alt="Comments" />
            <span>3</span>
          </li>
        </a>
      </ul>
    </div>
  );
};

export default BlogActions;
