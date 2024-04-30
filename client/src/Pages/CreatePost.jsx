import { useState } from "react";
import useAPICalls from "../Hooks/useAPICalls";

const CreatePost = () => {
  const { handleCreatePost } = useAPICalls();
  const [char, setChar] = useState(0);
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);

  const inputHandler = (e) => {
    setPost(e.target.value);
    setChar(e.target.value.length);
  };

  const handlePost = async (e) => {
    setLoading(true);
    await handleCreatePost(e, post, setPost);
    setLoading(false);
  };
  return (
    <form
      onSubmit={handlePost}
      className="py-16 px-16 h-screen w-full md:w-[80%] flex flex-col overflow-y-auto feed"
    >
      <h1 className="text-xl font-bold py-8">Create a New Post</h1>
      <textarea
        name="post"
        rows="4"
        cols="50"
        onChange={(e) => inputHandler(e)}
        className="w-full h-32 border border-p_Blue rounded p-4 bg-transparent outline-none text-slate-400"
      />
      <span className="text-right text-sm py-2 text-slate-500">
        Characters : {char}
      </span>
      <button
        type="submit"
        className="bg-p_Blue rounded px-10 py-1 mt-2 font-medium hover:bg-p_Blue/45 duration-200"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default CreatePost;
