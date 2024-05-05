import { IoMdHome } from "react-icons/io";
import { FiPlusSquare } from "react-icons/fi";
import { IoHomeOutline, IoPeopleOutline, IoPeopleSharp } from "react-icons/io5";
import { FaSquarePlus } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { RiMessage3Fill, RiMessage3Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

const Footer = () => {
  const location = useLocation();
  const path = location.pathname;
  const [menu, setMenu] = useState(false);
  return (
    <footer className="w-full md:hidden flex justify-center fixed bottom-4 ">
      <nav className="w-11/12 flex py-4 px-8 rounded-[2rem] justify-between bg-opacity-50 bg-p_black backdrop-blur-sm z-50">
        {path === "/" ? (
          <Link to={"/"} title="Home">
            <IoMdHome size={26} />
          </Link>
        ) : (
          <Link to={"/"} title="Home">
            <IoHomeOutline size={26} />
          </Link>
        )}
        {path === "/createpost" ? (
          <Link to={"/createpost"} title="Create a Post">
            <FaSquarePlus size={26} />
          </Link>
        ) : (
          <Link to={"/createpost"} title="Create a Post">
            <FiPlusSquare size={26} />
          </Link>
        )}
        {path === "/message" ? (
          <Link to={"/message"} title="Message">
            <RiMessage3Fill size={26} />
          </Link>
        ) : (
          <Link to={"/message"} title="Message">
            <RiMessage3Line size={26} />
          </Link>
        )}
        {path === "/userslist" ? (
          <Link to={"/userslist"} title="Connections">
            <IoPeopleSharp size={26} />
          </Link>
        ) : (
          <Link to={"/userslist"} title="Connections">
            <IoPeopleOutline size={26} />
          </Link>
        )}
        <button onClick={() => setMenu(!menu)}>
          <BsThreeDotsVertical size={25} />
        </button>
        {menu && (
          <div className="absolute right-12 -top-24 w-auto flex flex-col font-medium text-white bg-slate-600 rounded overflow-hidden">
            <Link
              to={"/youraccount"}
              className="p-1 px-2 border-b hover:bg-slate-700 duration-200"
              onClick={() => setMenu(!menu)}
            >
              Account
            </Link>
            <Link
              to={"bookmarks"}
              className="p-1 px-2 border-b hover:bg-slate-700 duration-200"
              onClick={() => setMenu(!menu)}
            >
              Bookmarks
            </Link>
            <Link
              to={"/login"}
              className="p-1 px-2 bg-red-600"
              onClick={() => setMenu(!menu)}
            >
              Logout
            </Link>
          </div>
        )}

        {/* {path === "/youraccount" ? (
          <Link to={"/youraccount"} title="Your Account">
            <FaUserCircle size={26} />
          </Link>
        ) : (
          <Link to={"/youraccount"} title="Your Account">
            <FaRegUserCircle size={26} />
          </Link>
        )} */}
      </nav>
    </footer>
  );
};

export default Footer;
