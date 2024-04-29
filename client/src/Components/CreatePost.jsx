import { MdInsertPhoto } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const user = useSelector((state) => state.user.userProfile);

  return (
    <section className="py-2 px-4 bg-p_Blue flex flex-col mb-6 rounded-md gap-2 h-40 w-full shadow-md shadow-p_text/60">
      <div className="h-3/4 flex gap-8 items-center justify-between">
        <figure className="w-24 h-24 rounded-full overflow-hidden border border-s_blue">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-full w-full object-contain"
          />
        </figure>
        <input
          type="text"
          placeholder="Whats happening.. !?"
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
          className="py-1 px-6 rounded border border-p_text font-semibold hover:bg-p_text hover:text-p_Blue duration-200"
        >
          POST
        </button>
      </div>
    </section>
  );
};

export default CreatePost;
