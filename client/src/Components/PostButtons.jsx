import PropTypes from "prop-types";
import { FaRegHeart, FaHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import axios from "axios";
import { API_UPDATEPOST_ACTIVITY } from "../Utils/APIs";
import toast from "react-hot-toast";
import { getAllFeeds } from "../App/feedSlice";
import { useDispatch } from "react-redux";
import authError from "../Utils/AuthError";
import { fetchUserFeed } from "../App/userSlice";

const PostButtons = ({ data, userId }) => {
  const dispatch = useDispatch();
  const likeAndSaveHandle = async (postId, button) => {
    try {
      const response = await axios.put(API_UPDATEPOST_ACTIVITY, {
        postId,
        button,
        userId,
      });
      if (response.status === 201) {
        dispatch(getAllFeeds());
        dispatch(fetchUserFeed());
        switch (button) {
          case "like":
            toast.success("Post Liked");
            break;
          case "dislike":
            toast.success("Post Disliked");
            break;
          case "save":
            toast.success("Post Saved");
            break;
          default:
            toast.success("Post Unsaved");
            break;
        }
      }
    } catch (error) {
      authError(error);
    }
  };

  return (
    <div className="flex justify-between pt-2 mt-4">
      <div className="flex flex-col w-10 justify-center items-center">
        <button
          onClick={() =>
            likeAndSaveHandle(
              data._id,
              `${data?.likes?.includes(userId) ? "dislike" : "like"}`
            )
          }
          title="Like"
        >
          {data?.likes?.includes(userId) ? (
            <FaHeart size={20} />
          ) : (
            <FaRegHeart size={20} />
          )}
        </button>
        <span className="text-sm">{data.likes.length}</span>
      </div>
      <div className="flex flex-col w-10 justify-center items-center">
        <button
          onClick={() => likeAndSaveHandle(data._id, "comment")}
          title="Comment"
        >
          <BiCommentDetail size={20} />
        </button>
        <span className="text-sm">{data.comments}</span>
      </div>
      <div className="flex flex-col w-10 justify-center items-center">
        <button
          onClick={() =>
            likeAndSaveHandle(
              data._id,
              `${data?.saved?.includes(userId) ? "unsave" : "save"}`
            )
          }
          title="Bookmark"
        >
          {data?.saved?.includes(userId) ? (
            <FaBookmark size={20} />
          ) : (
            <FaRegBookmark size={20} />
          )}
        </button>
        <span className="text-sm">{data.saved.length}</span>
      </div>
    </div>
  );
};

PostButtons.propTypes = {
  data: PropTypes.object,
  userId: PropTypes.string,
};

export default PostButtons;
