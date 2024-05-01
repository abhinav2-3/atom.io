import PropTypes from "prop-types";
import { FaRegHeart, FaHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import useAPICalls from "../Hooks/useAPICalls";
import { useState } from "react";
import Spinner from "../Utils/Spinner";

const PostButtons = ({ data, userId }) => {
  const { handleLikeSave } = useAPICalls();
  const [likeLoading, setLikeLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const postInteractionHandler = async (postId, button) => {
    if (button === "like" || button == "dislike") setLikeLoading(true);
    if (button === "save" || button == "unsave") setSaveLoading(true);
    await handleLikeSave(postId, button);
    setLikeLoading(false);
    setSaveLoading(false);
  };

  return (
    <div className="flex justify-between pt-2 mt-4 ">
      <div className="flex flex-col w-10 justify-center items-center">
        <button
          onClick={() => {
            postInteractionHandler(
              data._id,
              `${data?.likes?.includes(userId) ? "dislike" : "like"}`
            );
          }}
          title="Like"
          disabled={likeLoading}
        >
          {likeLoading ? (
            <Spinner />
          ) : data?.likes?.includes(userId) ? (
            <FaHeart size={20} />
          ) : (
            <FaRegHeart size={20} />
          )}
        </button>
        <span className="text-sm">{data.likes.length}</span>
      </div>
      <div className="flex flex-col w-10 justify-center items-center">
        <button
          onClick={() => handleLikeSave(data._id, "comment")}
          title="Comment"
        >
          <BiCommentDetail size={20} />
        </button>
        <span className="text-sm">{data.comments}</span>
      </div>
      <div className="flex flex-col w-10 justify-center items-center">
        <button
          onClick={() =>
            postInteractionHandler(
              data._id,
              `${data?.saved?.includes(userId) ? "unsave" : "save"}`
            )
          }
          title="Bookmark"
          disabled={saveLoading}
        >
          {saveLoading ? (
            <Spinner />
          ) : data?.saved?.includes(userId) ? (
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
