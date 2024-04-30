import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FiPlusSquare } from "react-icons/fi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { IoHomeOutline, IoPeopleOutline, IoPeopleSharp } from "react-icons/io5";
import { FaSquarePlus } from "react-icons/fa6";
import { RiMessage3Line, RiMessage3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { API_LOGOUT } from "../Utils/APIs";
import useCookie from "../Hooks/useCookie";
import { useDispatch } from "react-redux";
import { fetchUser } from "../App/userSlice";
import toast from "react-hot-toast";
import authError from "../Utils/AuthError";

const SideNavbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const { setCookie } = useCookie();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.get(API_LOGOUT);
      if (response.status === 200) {
        setCookie("userData", JSON.stringify(response.data?.user?._id), 2);
        dispatch(fetchUser());
        toast.success(response?.data?.message);
        navigate("/");
      }
    } catch (error) {
      authError(error);
    }
  };

  return (
    <aside className="relative top-16 w-[30%] py-8 hidden md:flex flex-col items-center gap-12 justify-center h-full text-p_text">
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
      <button onClick={logout} title="Logout">
        <FiLogOut size={33} />
      </button>
    </aside>
  );
};

export default SideNavbar;
