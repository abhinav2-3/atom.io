import { IoMdHome } from "react-icons/io";
import { FiPlusSquare } from "react-icons/fi";
import { FaUserCircle, FaRegUserCircle } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { FaSquarePlus } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <footer className="w-full bg-p_black flex py-4 px-8 border-t justify-between fixed">
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
      {path === "/youraccount" ? (
        <Link to={"/youraccount"} title="Your Account">
          <FaUserCircle size={26} />
        </Link>
      ) : (
        <Link to={"/youraccount"} title="Your Account">
          <FaRegUserCircle size={26} />
        </Link>
      )}
    </footer>
  );
};

export default Footer;
