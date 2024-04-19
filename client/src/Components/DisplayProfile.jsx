import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Skills from "./Skills";
import useCookie from "../Hooks/useCookie";

const DisplayProfile = () => {
  const { getCookie } = useCookie();
  const user = getCookie("userData");

  return (
    <div className="flex flex-col py-3 rounded-lg h-full  shadow-md shadow-p_Blue">
      <div className="flex justify-between items-center">
        <aside className="w-1/3 h-full grid place-items-center">
          <figure className="w-20 h-20 border rounded-full p-1">
            <FaUserCircle className="w-full h-full" />
          </figure>
          <button className="text-p_Blue hover:text-p_Blue/70 duration-200">
            Change Avatar
          </button>
        </aside>
        <aside className="flex flex-col flex-1 h-full justify-center ml-20">
          <h2 className="text-xl font-bold ">{user.name}</h2>
          <h4 className="text-slate-400">@{user.username}</h4>
          <Link
            to={"/editProfile"}
            className="bg-p_Blue rounded w-4/5 px-10 py-1 mt-2 font-medium hover:bg-p_Blue/45 duration-200"
          >
            Edit Profile
          </Link>
        </aside>
      </div>
      <article className="p-4 flex gap-4 flex-wrap">
        <Skills />
        <Skills />
        <Skills />
      </article>
    </div>
  );
};

export default DisplayProfile;
