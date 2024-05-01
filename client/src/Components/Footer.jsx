import { IoMdHome } from "react-icons/io";
import { FiPlusSquare } from "react-icons/fi";
import { FaUserCircle, FaRegUserCircle } from "react-icons/fa";
import { IoHomeOutline, IoPeopleOutline, IoPeopleSharp } from "react-icons/io5";
import { FaSquarePlus } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { RiMessage3Fill, RiMessage3Line } from "react-icons/ri";

const Footer = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <footer className="w-full md:hidden flex justify-center fixed bottom-4">
      <nav className="w-4/5 md:hidden bg-p_black flex py-4 px-8 rounded-3xl justify-between">
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
        {path === "/youraccount" ? (
          <Link to={"/youraccount"} title="Your Account">
            <FaUserCircle size={26} />
          </Link>
        ) : (
          <Link to={"/youraccount"} title="Your Account">
            <FaRegUserCircle size={26} />
          </Link>
        )}
      </nav>
    </footer>
  );
};

export default Footer;
