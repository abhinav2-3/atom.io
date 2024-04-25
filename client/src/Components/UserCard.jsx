import axios from "axios";
import PropTypes from "prop-types";
import { TiUserAdd, TiUserDelete } from "react-icons/ti";
import { API_ADDCONNECTION, API_REMOVE_CONNECTION } from "../Utils/APIs";
import toast from "react-hot-toast";
import authError from "../Utils/AuthError";
import { useDispatch } from "react-redux";
import { fetchUser } from "../App/userSlice";

const UserCard = ({ name, username, id, user }) => {
  const dispatch = useDispatch();
  const addConnection = async (secondUserId) => {
    try {
      const response = await axios.post(API_ADDCONNECTION, {
        userId: user._id,
        secondUserId,
      });
      if (response.status === 201) {
        dispatch(fetchUser());
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
        dispatch(fetchUser());
        toast.success(response?.data?.message);
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

        {user.connections.includes(id) ? (
          <button
            onClick={() => removeConnection(id)}
            className="text-red-500 flex items-center gap-2 text-lg font-semibold hover:text-red-700 duration-200"
          >
            Disconnect <TiUserDelete />
          </button>
        ) : (
          <button
            onClick={() => addConnection(id)}
            className="text-p_Blue flex items-center gap-2 text-lg font-semibold hover:text-p_Blue/80 duration-200"
          >
            Connect <TiUserAdd />
          </button>
        )}
      </aside>
      <figure className="rounded-full w-20 h-20 p-1 border"></figure>
    </div>
  );
};

UserCard.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  id: PropTypes.string,
  user: PropTypes.object,
};

export default UserCard;
