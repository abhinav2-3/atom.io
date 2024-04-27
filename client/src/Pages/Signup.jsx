import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { API_SIGNUP } from "../Utils/APIs";
import toast from "react-hot-toast";
import authError from "../Utils/AuthError";
import useCookie from "../Hooks/useCookie";
import { useDispatch } from "react-redux";
import { fetchUser } from "../App/userSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setCookie } = useCookie();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_SIGNUP, formData);
      if (response.status === 201) {
        navigate("/");
        setCookie("userData", JSON.stringify(response.data?.user?._id), 2);
        dispatch(fetchUser());
        toast.success(response.data.message);
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
    <div className="w-full h-[84vh] bg-p_black text-white p-8 ">
      <h1 className="px-14 text-2xl font-bold text-center">
        Welcome to Developers Community.
      </h1>
      <div className="flex gap-5 w-full items-center">
        <figure className="w-1/2 justify-center h-full hidden md:flex">
          <img
            src="/x-dev-logo.jpg"
            alt="Logo"
            className="w-[60%] h-full object-contain shadow-lg rounded-full shadow-s_blue/45"
          />
        </figure>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="p-4 md:w-1/2 w-full flex gap-5 flex-col items-center justify-center"
        >
          <div className="flex flex-col items-start w-2/3">
            <label className="text-lg font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="FullName"
              onChange={(e) => handleValue(e)}
              className="outline-none border rounded py-1 px-4 text-p_black w-full"
            />
          </div>
          <div className="flex flex-col items-start w-2/3">
            <label className="text-lg font-medium">UserName</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="dev_28"
              onChange={(e) => handleValue(e)}
              className="outline-none border rounded py-1 px-4 text-p_black w-full"
            />
          </div>
          <div className="flex flex-col items-start w-2/3">
            <label className="text-lg font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="example@gmail.com"
              onChange={(e) => handleValue(e)}
              className="outline-none border rounded py-1 px-4 text-p_black w-full"
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
                className="outline-none border-none rounded py-1 px-4 text-p_black w-full"
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
          {/* <div className="flex flex-col items-start w-2/3">
            <label className="text-lg font-medium">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              placeholder="HTML,CSS"
              onChange={(e) => handleValue(e)}
              className="outline-none border rounded py-1 px-4 text-p_black w-full"
            />
          </div> */}
          <button
            type="submit"
            className="bg-p_Blue mt-4 px-8 py-2 rounded w-2/3 hover:bg-s_blue duration-200 uppercase font-medium text-lg"
          >
            Signup
          </button>
          <span className="ml-16 pb-2">
            Already Registered ?{" "}
            <Link
              to="/login"
              className="text-p_Blue hover:text-s_blue duration-200"
            >
              Login
            </Link>
          </span>

          {/* <button onClick={() => loginWithRedirect()}>Log In</button> */}
        </form>
      </div>
    </div>
  );
};

export default Signup;
