import axios from "axios";
import PropTypes from "prop-types";
import { API_ADDCONNECTION, API_REMOVE_CONNECTION } from "../Utils/APIs";
import toast from "react-hot-toast";
import authError from "../Utils/AuthError";
import { useDispatch } from "react-redux";
import { fetchUser } from "../App/userSlice";
import { getUser } from "../Utils/Authentication";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

const UserCard = ({ name, username, id, avatar, user }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");

  useEffect(() => {
    setImage(avatar);
  }, [avatar]);

  const addConnection = async (secondUserId) => {
    try {
      const response = await axios.post(API_ADDCONNECTION, {
        userId: user._id,
        secondUserId,
      });
      if (response.status === 201) {
        const userId = getUser();
        dispatch(fetchUser(userId));
        toast.success(response?.data?.message);
      }
    } catch (error) {
      authError(error);
    }
  };
  const removeConnection = async (secondUserId) => {
    try {
      const response = await axios.put(API_REMOVE_CONNECTION, {
        userId: user._id,
        secondUserId,
      });
      if (response.status === 201) {
        const userId = getUser();
        dispatch(fetchUser(userId));
        toast.success(response?.data?.message);
      }
    } catch (error) {
      authError(error);
    }
  };

  return (
    <div className="py-3 px-4 w-full flex justify-between shadow-lg rounded-lg shadow-p_Blue/40">
      <aside className="flex items-center justify-center gap-2 md:gap-5">
        <figure className="rounded-full w-20 h-20 p-1 overflow-hidden border">
          {image === "" || image === null || image === undefined ? (
            <FaUserCircle className="w-full h-full" />
          ) : (
            <img
              src={avatar}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </figure>
        <div>
          <h1 className="md:text-2xl text-lg font-bold">{name}</h1>
          <h4 className="text-slate-400 lowercase">@{username}</h4>
        </div>
      </aside>
      <aside className="grid place-items-center">
        {user.connections.includes(id) ? (
          <button
            onClick={() => removeConnection(id)}
            className="text-red-500 text-lg md:py-2 py-1 md:px-4 px-2 border border-red-600 rounded-2xl font-semibold hover:text-red-700 duration-200"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() => addConnection(id)}
            className="text-green-500  md:py-2 py-1 md:px-4 px-2 border border-green-500 rounded-2xl text-lg font-semibold hover:text-green-700 duration-200"
          >
            Connect
          </button>
        )}
      </aside>
    </div>
  );
};

UserCard.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  id: PropTypes.string,
  avatar: PropTypes.string,
  user: PropTypes.object,
};

export default UserCard;
