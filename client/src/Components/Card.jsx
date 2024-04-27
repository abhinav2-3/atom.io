import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Suspense, lazy, useState } from "react";
import Loader from "./Loader";
import useAPICalls from "../Hooks/useAPICalls";
const PostButtons = lazy(() => import("./PostButtons"));
const ActionButton = lazy(() => import("./ActionButton"));

const Card = (data) => {
  const { handlePostUpdate } = useAPICalls();
  const [isEdit, setIsEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(data.post);

  const user = useSelector((state) => state.user.userProfile);

  const updateHandle = async (id) => {
    setLoading(true);
    await handlePostUpdate(id, input, setIsEdit);
    setLoading(false);
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
            {loading ? "Updating..." : "Update"}
          </button>
        </>
      ) : (
        <article className="my-2 text-wrap text-justify leading-tight text-ellipsis text-slate-200">
          {data.post}
        </article>
      )}
      <Suspense fallback={<Loader />}>
        <PostButtons data={data} userId={user?._id} />
      </Suspense>
    </div>
  );
};

// Handling Props Warnings
Card.propTypes = {
  data: PropTypes.object,
};

export default Card;
