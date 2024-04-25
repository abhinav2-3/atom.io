import PropTypes from "prop-types";
import axios from "axios";
import { API_UPDATEPOST } from "../Utils/APIs";
import toast from "react-hot-toast";
import authError from "../Utils/AuthError";
import { getAllFeeds } from "../App/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, lazy, useState } from "react";
import { fetchUserFeed } from "../App/userSlice";
import Loader from "./Loader";
const PostButtons = lazy(() => import("./PostButtons"));
const ActionButton = lazy(() => import("./ActionButton"));

const Card = (data) => {
  const [isEdit, setIsEdit] = useState(null);
  const [input, setInput] = useState(data.post);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userProfile);

  const updateHandle = async (id) => {
    try {
      const response = await axios.put(API_UPDATEPOST, { id, input });
      if (response.status === 201) {
        toast.success("Updated");
        dispatch(getAllFeeds());
        dispatch(fetchUserFeed());
        setIsEdit(false);
      }
    } catch (error) {
      authError(error);
    }
  };

  return (
    <div className="pb-4 flex flex-col px-5 rounded mb-7 tracking-tight overflow-hidden shadow-lg shadow-p_Blue/70">
      <div className="flex justify-between">
        <h1 className="font-bold text-p_Blue">{data.name}</h1>
        {user?._id === data?.postedBy && (
          <Suspense fallback={<Loader />}>
            <ActionButton
              postId={data._id}
              onData={(data) => {
                setIsEdit(data);
                console.log(data);
              }}
            />
          </Suspense>
        )}
      </div>
      <span className="lowercase text-sm text-slate-400">@{data.username}</span>
      {isEdit ? (
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
      <Suspense fallback={<Loader />}>
        <PostButtons {...data} />
      </Suspense>
    </div>
  );
};

// Handling Props Warnings
Card.propTypes = {
  data: PropTypes.object,
};

export default Card;
