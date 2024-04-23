import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { API_UPDATE_AVATAR } from "../Utils/APIs";
import authError from "../Utils/AuthError";
import toast from "react-hot-toast";
import useCookie from "../Hooks/useCookie";
import { useDispatch } from "react-redux";
import { addUser } from "../App/userSlice";

const ProfilePicture = ({ userId }) => {
  const disptach = useDispatch();
  const [image, setImage] = useState("");
  const { setCookie } = useCookie();
  const convertToBase64 = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  const updateAvatar = async () => {
    try {
      const response = await axios.put(API_UPDATE_AVATAR, { image, userId });
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        console.log(response.data.user);
        disptach(addUser(response?.data?.user));
        setCookie("userData", JSON.stringify(response.data?.user), 2);
      }
    } catch (error) {
      authError(error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col gap-2">
      <figure className="w-20 h-20 border overflow-hidden rounded-full p-1">
        {image === "" || image === null ? (
          <FaUserCircle className="w-full h-full" />
        ) : (
          <img
            src={image}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        )}
      </figure>
      <label htmlFor="avatar" className="relative cursor-pointer">
        <input
          id="avatar"
          className="hidden"
          accept="image/*"
          type="file"
          onChange={convertToBase64}
        />
        <div className="text-p_Blue font-semibol">Select Pic</div>
      </label>
      <button
        className=" bg-white text-p_Blue border border-p_Blue hover:border-p_Blue/70 rounded-md py-1 px-2 hover:bg-p_Blue hover:text-white duration-200"
        onClick={updateAvatar}
      >
        Upload
      </button>
    </div>
  );
};

ProfilePicture.propTypes = {
  userId: PropTypes.string,
};

export default ProfilePicture;
