import { IoMdHome } from "react-icons/io";
import { FiPlusSquare } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-p_black flex py-4 px-8 border-t justify-between fixed">
      <Link to={"/"}>
        <IoMdHome size={26} />
      </Link>
      <Link to={"/createpost"}>
        <FiPlusSquare size={26} />
      </Link>
      <Link to={"/youraccount"}>
        <FaUserCircle size={26} />
      </Link>
    </footer>
  );
};

export default Footer;
