import { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import useCookie from "../Hooks/useCookie";

const EditProfile = () => {
  const { getCookie } = useCookie();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(null);
  const cookie = getCookie("userData");
  useEffect(() => {
    setUserData(JSON.parse(cookie));
    console.log(userData);
  }, []);
  console.log(userData);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    number: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleValue = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
      <div className="flex flex-col items-start w-2/3">
        <label className="text-lg font-medium">Phone No.</label>
        <input
          type="number"
          name="number"
          value={formData.number}
          placeholder="000011110"
          onChange={(e) => handleValue(e)}
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
