import { Link, useLocation } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FiPlusSquare } from "react-icons/fi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { IoHomeOutline, IoPeopleOutline, IoPeopleSharp } from "react-icons/io5";
import { FaSquarePlus } from "react-icons/fa6";
import { RiMessage3Line, RiMessage3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";

const SideNavbar = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <aside className="relative top-16 w-[20%] py-8 flex flex-col items-center gap-12 justify-center h-full text-p_text">
      <nav className="flex py-10 flex-col gap-12 items-center w-1/2 bg-s_blue rounded-3xl">
        {path === "/" ? (
          <Link to={"/"} title="Home">
            <IoMdHome size={33} />
          </Link>
        ) : (
          <Link to={"/"} title="Home">
            <IoHomeOutline size={33} />
          </Link>
        )}
        {path === "/createpost" ? (
          <Link to={"/createpost"} title="Create a Post">
            <FaSquarePlus size={33} />
          </Link>
        ) : (
          <Link to={"/createpost"} title="Create a Post">
            <FiPlusSquare size={33} />
          </Link>
        )}
        {path === "/message" ? (
          <Link to={"/message"} title="Message">
            <RiMessage3Fill size={33} />
          </Link>
        ) : (
          <Link to={"/message"} title="Message">
            <RiMessage3Line size={33} />
          </Link>
        )}
        {path === "/userslist" ? (
          <Link to={"/userslist"} title="Connections">
            <IoPeopleSharp size={33} />
          </Link>
        ) : (
          <Link to={"/userslist"} title="Connections">
            <IoPeopleOutline size={33} />
          </Link>
        )}
        {path === "/bookmarks" ? (
          <Link to={"/bookmarks"} title="Bookmarks">
            <FaBookmark size={33} />
          </Link>
        ) : (
          <Link to={"/bookmarks"} title="Bookmarks">
            <FaRegBookmark size={33} />
          </Link>
        )}
      </nav>
      <button>
        <FiLogOut size={33} />
      </button>
    </aside>
  );
};

export default SideNavbar;
