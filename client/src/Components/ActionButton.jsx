import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { API_DELTEPOST } from "../Utils/APIs";
import axios from "axios";
import { getAllFeeds } from "../App/feedSlice";
import toast from "react-hot-toast";
import authError from "../Utils/AuthError";
import { BsThreeDotsVertical } from "react-icons/bs";

const ActionButton = ({ postId, onData }) => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const [edit, setEdit] = useState(true);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const sendData = () => {
    setEdit(!edit);
    onData(edit);
  };

  const deletePost = async (id) => {
    try {
      const response = await axios.post(API_DELTEPOST, { id });
      if (response.status === 200) {
        dispatch(getAllFeeds());
        toast.success("Deleted");
      }
    } catch (error) {
      authError(error);
    }
  };

  return (
    <div className="relative inline-block">
      <button onClick={toggleOptions} title="Edit Post">
        <BsThreeDotsVertical size={22} />
      </button>
      {showOptions && (
        <div className="absolute right-2 w-20 bg-slate-600 rounded overflow-hidden">
          <ul>
            <li
              className="hover:bg-s_blue cursor-pointer p-1"
              onClick={sendData}
            >
              Edit
            </li>
            <li
              className="hover:bg-red-600 cursor-pointer border-t p-1"
              onClick={() => deletePost(postId)}
            >
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

ActionButton.propTypes = {
  postId: PropTypes.string,
  onData: PropTypes.func,
};

export default ActionButton;
