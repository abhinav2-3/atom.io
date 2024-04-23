import { useState } from "react";
import useCookie from "../Hooks/useCookie";
import axios from "axios";
import { API_UPDATE_USERPROFILE } from "../Utils/APIs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import authError from "../Utils/AuthError";

const EditProfile = () => {
  const { getCookie, setCookie } = useCookie();
  const navigate = useNavigate();

  const cookie = getCookie("userData");

  const [formData, setFormData] = useState({
    name: cookie.name || "",
    username: cookie.username || "",
    email: cookie.email || "",
    password: cookie.password || "",
  });

  const handleValue = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(API_UPDATE_USERPROFILE, formData);
      if (response.status === 201) {
        setCookie("userData", JSON.stringify(response.data?.user), 2);
        toast.success(response?.data?.message);
        navigate("/youraccount");
      }
    } catch (error) {
      authError(error);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="p-4 md:w-1/2 w-full h-[84vh] flex gap-5 flex-col items-center justify-center"
    >
      <div className="flex flex-col items-start w-2/3">
        <label className="text-lg font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="FullName"
          onChange={handleValue}
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
          onChange={handleValue}
          className="outline-none border rounded py-1 px-4 text-p_black w-full"
        />
      </div>
      <div className="flex flex-col items-start w-2/3">
        <label className="text-lg font-medium">Email</label>
        <input
          type="email"
          name="email"
          defaultValue={formData.email}
          placeholder="example@gmail.com"
          className="outline-none border rounded py-1 px-4 text-p_black w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-p_Blue mt-4 px-8 py-2 rounded w-2/3 hover:bg-s_blue duration-200 uppercase font-medium text-lg"
      >
        Update
      </button>
    </form>
  );
};

export default EditProfile;
