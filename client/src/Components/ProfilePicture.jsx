import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { API_UPDATE_AVATAR } from "../Utils/APIs";
import authError from "../Utils/AuthError";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchUser } from "../App/userSlice";

const ProfilePicture = ({ user, edit, setEdit }) => {
  const disptach = useDispatch();
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    user?.avatar && setImage(user?.avatar);
  }, [user.avatar]);

  const convertToBase64 = (e) => {
    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
    setUploading(false);
  };

  const updateAvatar = async () => {
    setUploading(true);
    try {
      const response = await axios.put(API_UPDATE_AVATAR, {
        image,
        userId: user._id,
      });
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        disptach(fetchUser());
        setEdit(false);
        setUploading(false);
      }
    } catch (error) {
      authError(error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col gap-2">
      <figure className="w-20 h-20 border overflow-hidden rounded-full p-1">
        {image === "" || image === null || image === undefined ? (
          <FaUserCircle className="w-full h-full" />
        ) : (
          <img
            src={image}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        )}
      </figure>
      {edit && (
        <>
          <label htmlFor="avatar" className="relative cursor-pointer">
            <input
              id="avatar"
              className="hidden"
              accept="image/*"
              type="file"
              onChange={convertToBase64}
            />
            <div className="text-white font-semibol">Select Pic</div>
          </label>

          <button
            className={`bg-white text-p_Blue border border-p_Blue hover:border-p_Blue/70 rounded-md py-1 px-2 hover:bg-p_Blue hover:text-white duration-200 ${
              uploading && "pointer-events-none"
            }`}
            onClick={updateAvatar}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </>
      )}
    </div>
  );
};

ProfilePicture.propTypes = {
  user: PropTypes.object,
  edit: PropTypes.bool,
  setEdit: PropTypes.func,
};

export default ProfilePicture;
