import axios from "axios";
import PropTypes from "prop-types";
import { TiUserAdd } from "react-icons/ti";
import { API_ADDCONNECTION } from "../Utils/APIs";
import toast from "react-hot-toast";
import authError from "../Utils/AuthError";
import { useState } from "react";

const UserCard = ({ name, username, id, userId }) => {
  const [isConnected, setConnected] = useState(false);

  const addConnection = async (secondUserId) => {
    try {
      const response = await axios.post(API_ADDCONNECTION, {
        userId,
        secondUserId,
      });
      if (response.status === 201) {
        toast.success(response.data.message);

        setConnected(true);
      }
    } catch (error) {
      authError(error);
    }
  };

  return (
    <div className="py-2 px-4 w-full flex justify-between shadow-lg rounded-lg shadow-p_Blue/40">
      <aside className="flex flex-col items-start">
        <h1 className="text-2xl font-bold">{name}</h1>
        <h4 className="text-slate-400 lowercase">@{username}</h4>
        <button
          className="text-p_Blue text-lg font-semibold hover:text-p_Blue/80 duration-200"
          onClick={() => addConnection(id)}
        >
          {isConnected ? (
            <span>Connected</span>
          ) : (
            <span className="flex gap-2 items-center ">
              Connect <TiUserAdd />
            </span>
          )}
        </button>
      </aside>
      <figure className="rounded-full w-20 h-20 p-1 border"></figure>
    </div>
  );
};

UserCard.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  id: PropTypes.string,
  userId: PropTypes.string,
};

export default UserCard;
