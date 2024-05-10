import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";
import useAPICalls from "../Hooks/useAPICalls";

const CommentModel = ({ closeModal, post }) => {
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addComment } = useAPICalls();

  const commentHandler = async () => {
    setLoading(true);
    await addComment(post?._id, input);
    setInput("");
    setLoading(false);
  };

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);

  return (
    <div className="fixed z-50 inset-0 w-full bg-p_black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-p_black px-8 py-4 w-[75%] h-3/4 rounded relative">
        <button
          className="absolute top-3 right-4 bg-white p-1 rounded"
          onClick={() => closeModal(false)}
        >
          <RxCross2 size={22} color="red" />
        </button>
        <div className="w-full flex gap-2 mt-8">
          <input
            type="text"
            value={input}
            placeholder="Whats your Thought!"
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent flex-1 outline-none border-slate-400 border py-1 px-3 rounded-lg"
          />
          <button
            onClick={commentHandler}
            disabled={loading}
            className="bg-p_text text-p_Blue font-bold px-2 rounded-lg hover:bg-transparent duration-200 hover:text-p_text"
          >
            {loading ? "Please Wait" : "Comment"}
          </button>
        </div>
        <div className="w-full px-4 mt-4 overflow-auto h-5/6 feed text-white flex flex-col gap-4">
          {comments?.map((data) => {
            return (
              <div key={data._id} className=" border px-4 py-1 rounded-lg">
                <span className="text-slate-600">@{data.commentedBy}</span>
                <li className="list-none text-lg font-semibold">{data.body}</li>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

CommentModel.propTypes = {
  closeModal: PropTypes.function,
  post: PropTypes.obj,
};
export default CommentModel;
