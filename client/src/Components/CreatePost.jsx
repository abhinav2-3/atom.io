import { MdInsertPhoto } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useAPICalls from "../Hooks/useAPICalls";
import { FaUserCircle } from "react-icons/fa";

const CreatePost = () => {
  const { handleCreatePost } = useAPICalls();
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const user = useSelector((state) => state.user.userProfile);

  useEffect(() => {
    user?.avatar && setImage(user?.avatar);
  }, [user?.avatar]);

  const inputHandler = (e) => {
    setPost(e.target.value);
  };

  const handlePost = async (e) => {
    setLoading(true);
    await handleCreatePost(e, post, setPost);
    setLoading(false);
  };

  return (
    <section className="py-2 px-4 bg-p_Blue flex flex-col mb-6 rounded-md gap-2 h-40 w-full shadow-md shadow-p_text/60">
      <div className="h-3/4 flex gap-8 items-center justify-between">
        <figure className="w-24 h-24 rounded-full overflow-hidden border border-s_blue">
          {image === "" || image === null || image === undefined ? (
            <FaUserCircle className="w-full h-full" />
          ) : (
            <img
              src={image}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </figure>
        <input
          type="text"
          placeholder="Whats happening.. !?"
          onChange={(e) => inputHandler(e)}
          value={post}
          className="flex-1 bg-transparent border py-3 px-5 border-p_text rounded-lg outline-none"
        />
      </div>
      <div className="w-full flex justify-around text-lg">
        <button
          className="duration-200 hover:-translate-y-2"
          title="Upload Image"
        >
          <MdInsertPhoto size={25} />
        </button>
        <button
          className="duration-200 hover:-translate-y-2"
          title="Upload Video"
        >
          <FaVideo size={25} />
        </button>
        <button
          title="Create Post"
          onClick={(e) => handlePost(e)}
          className={`py-1 px-6 rounded border border-p_text font-semibold hover:bg-p_text hover:text-p_Blue duration-200 ${
            loading && "pointer-events-none"
          }`}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </section>
  );
};

export default CreatePost;
