import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import authError from "../Utils/AuthError";
import useCookie from "../Hooks/useCookie";
import toast from "react-hot-toast";
import axios from "axios";
import { API_LOGIN } from "../Utils/APIs";
import { useDispatch } from "react-redux";
import { addUser } from "../App/userSlice";

const Login = () => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setCookie, getCookie } = useCookie();
  const cookie = getCookie("userData");

  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    setUserData(JSON.parse(cookie));
  }, []);

  userData && navigate("/");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_LOGIN, formData);
      if (response.status === 201) {
        dispatch(addUser(response.data.user));
        setCookie("userData", JSON.stringify(response.data?.user), 2); //Setting cookie
        toast.success("Logged In");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      authError(error);
    }
  };

  const handleValue = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="w-screen h-svh bg-p_black text-white p-8 ">
      <h1 className="px-14 text-2xl font-bold text-center my-8">
        Welcome to Developers Community.
      </h1>
      <div className="flex gap-5 w-full items-center">
        <figure className="w-1/2 justify-center h-full hidden md:flex">
          <img
            src="/x-dev logo.jpg"
            alt="Logo"
            className="w-[80%] h-full object-contain"
          />
        </figure>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="p-4 md:w-1/2 w-full flex gap-5 flex-col items-center justify-center"
        >
          <div className="flex flex-col items-start w-2/3">
            <label className="text-lg font-medium">UserName / Email</label>
            <input
              type="text"
              name="username"
              onChange={(e) => handleValue(e)}
              placeholder="username"
              className="outline-none border-none rounded py-2 px-4 text-p_black w-full"
            />
          </div>
          <div className="flex flex-col items-start w-2/3">
            <label className="text-lg font-medium">Password</label>
            <div className="flex justify-between rounded bg-white border w-full items-center">
              <input
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                onChange={(e) => handleValue(e)}
                placeholder="password"
                className="outline-none border-none rounded py-2 px-4 text-p_black w-full"
              />
              {showPassword ? (
                <FaRegEyeSlash
                  size={25}
                  color="black"
                  className="mx-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <IoEyeOutline
                  size={25}
                  color="black"
                  className="mx-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          <button className="bg-p_Blue mt-4 px-8 py-2 rounded w-2/3 hover:bg-s_blue duration-200 uppercase font-medium text-lg">
            Login
          </button>
          <span className="ml-16">
            Already Registered ?
            <Link
              to="/signup"
              className="text-p_Blue ml-2 hover:text-s_blue duration-200"
            >
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
