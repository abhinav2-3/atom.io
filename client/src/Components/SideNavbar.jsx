import { Link, useLocation } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FiPlusSquare } from "react-icons/fi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { IoHomeOutline, IoPeopleOutline, IoPeopleSharp } from "react-icons/io5";
import { FaSquarePlus } from "react-icons/fa6";
import { getUser } from "../Utils/Authentication";
import {
  RiMessage3Line,
  RiMessage3Fill,
  RiLogoutBoxLine,
  RiLoginBoxFill,
} from "react-icons/ri";

const SideNavbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const user = getUser();

  return (
    <aside className="relative top-16 overflow-auto w-[30%] feed h-full py-8 hidden md:flex flex-col items-center gap-10 justify-center text-p_text">
      <nav className="flex py-10 flex-col gap-4 items-center w-1/2 bg-s_blue rounded-3xl">
        {path === "/" ? (
          <Link
            to={"/"}
            title="Home"
            className="hover:bg-p_black/60 rounded-lg p-3 duration-200"
          >
            <IoMdHome size={30} />
          </Link>
        ) : (
          <Link
            to={"/"}
            title="Home"
            className="hover:bg-p_black/60 rounded-lg p-3 duration-200"
          >
            <IoHomeOutline size={30} />
          </Link>
        )}
        {path === "/createpost" ? (
          <Link
            to={"/createpost"}
            title="Create a Post"
            className="hover:bg-p_black/60 rounded-lg p-3 duration-200"
          >
            <FaSquarePlus size={30} />
          </Link>
        ) : (
          <Link
            to={"/createpost"}
            title="Create a Post"
            className="hover:bg-p_black/60 rounded-lg p-3 duration-200"
          >
            <FiPlusSquare size={30} />
          </Link>
        )}
        {path === "/message" ? (
          <Link
            to={"/message"}
            title="Message"
            className="hover:bg-p_black/60 rounded-lg p-3 duration-200"
          >
            <RiMessage3Fill size={30} />
          </Link>
        ) : (
          <Link
            to={"/message"}
            title="Message"
            className="hover:bg-p_black/60 rounded-lg p-3 duration-200"
          >
            <RiMessage3Line size={30} />
          </Link>
        )}
        {path === "/userslist" ? (
          <Link
            to={"/userslist"}
            title="Connections"
            className="hover:bg-p_black/60 rounded-lg p-3 duration-200"
          >
            <IoPeopleSharp size={30} />
          </Link>
        ) : (
          <Link
            to={"/userslist"}
            title="Connections"
            className="hover:bg-p_black/60 rounded-lg p-3 duration-200"
          >
            <IoPeopleOutline size={30} />
          </Link>
        )}
        {path === "/bookmarks" ? (
          <Link
            to={"/bookmarks"}
            title="Bookmarks"
            className="hover:bg-p_black/60 rounded-lg p-3 duration-200"
          >
            <FaBookmark size={28} />
          </Link>
        ) : (
          <Link
            to={"/bookmarks"}
            title="Bookmarks"
            className="hover:bg-p_black/60 rounded-lg p-3 duration-200"
          >
            <FaRegBookmark size={28} />
          </Link>
        )}
      </nav>
      {user ? (
        <Link
          onClick={() => localStorage.removeItem("userData")}
          title="Logout"
          to={"/login"}
        >
          <RiLogoutBoxLine size={30} />
        </Link>
      ) : (
        <Link
          title="Login"
          to={"/login"}
          className="hover:bg-p_black/60 rounded-lg p-3 duration-200"
        >
          Login <RiLoginBoxFill size={30} />
        </Link>
      )}
    </aside>
  );
};

export default SideNavbar;
