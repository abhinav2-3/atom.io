import PropTypes from "prop-types";
import { FaUserCircle } from "react-icons/fa";
import PostButtons from "./PostButtons";
import useCookie from "../Hooks/useCookie";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { API_DELTEPOST, API_UPDATEPOST } from "../Utils/APIs";
import toast from "react-hot-toast";
import authError from "../Utils/AuthError";
import { getAllFeeds } from "../App/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Card = (data) => {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(data.post);
  const dispatch = useDispatch();
  const { getCookie } = useCookie();
  const user = getCookie("userData");

  const user2 = useSelector((state) => state.user.userProfile);

  const deletePost = async (id) => {
    try {
      const response = await axios.post(API_DELTEPOST, { id });
      if (response.status === 201) {
        dispatch(getAllFeeds());
        toast.success("Deleted");
      }
    } catch (error) {
      console.log(error);
      authError(error);
    }
  };

  const updateHandle = async (id) => {
    try {
      console.log(id, input);
      const response = await axios.put(API_UPDATEPOST, { id, input });
      console.log(response);
      if (response.status === 201) {
        toast.success("Updated");
        dispatch(getAllFeeds());
        setEdit(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pb-4 flex flex-col px-5 rounded mb-7 tracking-tight overflow-hidden shadow-lg shadow-p_Blue/70">
      {user?._id === data?.postedBy && (
        <div className="pb-4 py-1 w-full flex justify-between text-lg">
          <button onClick={() => setEdit(!edit)}>
            <FiEdit color="yellow" className="duration-200 hover:scale-110" />
          </button>
          <button onClick={() => deletePost(data?._id)}>
            <MdDeleteForever
              color="red"
              size={23}
              className="duration-200 hover:scale-110"
            />
          </button>
        </div>
      )}
      <div className="flex justify-between">
        <h1 className="font-bold text-p_Blue">{data.name}</h1>
        <figure className="w-9 h-9 border overflow-hidden rounded-full p-1">
          {(user2?._id === data?._id && user2?.avatar === "") ||
          user2?.avatar === null ? (
            <FaUserCircle className="w-full h-full" />
          ) : (
            <img
              src={user2?.avatar}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </figure>
      </div>
      <span className="lowercase text-sm text-slate-400">@{data.username}</span>
      {edit ? (
        <>
          <input
            name="post"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="my-2 border p-2 text-wrap text-justify leading-tight text-ellipsis text-slate-200 bg-transparent"
          />
          <button
            className="bg-p_Blue px-4 py-1 rounded"
            onClick={() => updateHandle(data._id)}
          >
            Update
          </button>
        </>
      ) : (
        <article className="my-2 text-wrap text-justify leading-tight text-ellipsis text-slate-200">
          {data.post}
        </article>
      )}

      <PostButtons {...data} />
    </div>
  );
};

// Handling Props Warnings
Card.propTypes = {
  data: PropTypes.object,
};

export default Card;
