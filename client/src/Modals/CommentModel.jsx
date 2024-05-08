import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";

const dummyComments = [
  {
    body: "1st comment",
  },
  {
    body: "2st comment",
  },
  {
    body: "3st comment",
  },
  {
    body: "4st comment",
  },
];
const CommentModel = ({ closeModal }) => {
  const [comments, setComments] = useState(dummyComments);
  const [input, setInput] = useState("");

  const commentHandler = () => {
    const newComment = {
      body: input,
    };
    setComments((prev) => [newComment, ...prev]);
    setInput("");
  };

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
            className="bg-p_text text-p_Blue font-bold px-2 rounded-lg hover:bg-transparent duration-200 hover:text-p_text"
          >
            Comment
          </button>
        </div>
        <div className="w-full mt-4 overflow-auto h-5/6 feed text-white flex flex-col gap-4">
          {comments?.map((data, i) => {
            return (
              <li
                key={i}
                className="list-none border p-3 border-slate-500 rounded-lg"
              >
                {data.body}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

CommentModel.propTypes = {
  closeModal: PropTypes.func,
};
export default CommentModel;