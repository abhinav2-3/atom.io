import PropTypes from "prop-types";
import { FaRegHeart, FaHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import useAPICalls from "../Hooks/useAPICalls";
import { useState } from "react";
import Spinner from "../Utils/Spinner";

const PostButtons = ({ data, user }) => {
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
              `${user?.likes?.includes(data?._id) ? "dislike" : "like"}`
            );
          }}
          title="Like"
          disabled={likeLoading}
        >
          {likeLoading ? (
            <Spinner />
          ) : user?.likes?.includes(data._id) ? (
            <FaHeart size={20} />
          ) : (
            <FaRegHeart size={20} />
          )}
        </button>
        <span className="text-sm">{data.likes}</span>
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
              `${user?.saved?.includes(data._id) ? "unsave" : "save"}`
            )
          }
          title="Bookmark"
          disabled={saveLoading}
        >
          {saveLoading ? (
            <Spinner />
          ) : user?.saved?.includes(data._id) ? (
            <FaBookmark size={20} />
          ) : (
            <FaRegBookmark size={20} />
          )}
        </button>
        <span className="text-sm">{data.saved}</span>
      </div>
    </div>
  );
};

PostButtons.propTypes = {
  data: PropTypes.object,
  user: PropTypes.object,
};

export default PostButtons;
