import { FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import axios from "axios";
import { API_UPDATEPOST_ACTIVITY } from "../Utils/APIs";
import toast from "react-hot-toast";
import { getAllFeeds } from "../App/feedSlice";
import { useDispatch } from "react-redux";
import authError from "../Utils/AuthError";

const PostButtons = (data) => {
  const dispatch = useDispatch();
  const likeAndSaveHandle = async (postId, button) => {
    try {
      const response = await axios.post(API_UPDATEPOST_ACTIVITY, {
        postId,
        button,
      });
      console.log(response);
      if (response.status === 201) {
        dispatch(getAllFeeds());
        toast.success("Post Liked");
      }
    } catch (error) {
      authError(error);
    }
  };

  return (
    <div className="flex justify-between pt-2 mt-4">
      <div className="flex flex-col w-10 justify-center items-center">
        <button
          onClick={() => likeAndSaveHandle(data._id, "like")}
          title="Like"
        >
          <FaRegHeart size={20} />
        </button>
        <span className="text-sm">{data.likes}</span>
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
          onClick={() => likeAndSaveHandle(data._id, "save")}
          title="Bookmarks"
        >
          <FaRegBookmark size={20} />
        </button>
        <span className="text-sm">{data.saved}</span>
      </div>
    </div>
  );
};

export default PostButtons;
