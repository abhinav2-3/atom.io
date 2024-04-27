import { useState } from "react";
import useAPICalls from "../Hooks/useAPICalls";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const { handleEditProfile } = useAPICalls();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.userProfile);

  const [formData, setFormData] = useState({
    name: user.name || "",
    username: user.username || "",
    email: user.email || "",
  });

  const handleValue = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    handleEditProfile(e, formData);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 md:w-1/2 w-full h-screen flex gap-5 flex-col items-center justify-center"
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
          className="outline-none border rounded py-1 px-4 text-p_black w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-p_Blue mt-4 px-8 py-2 rounded w-2/3 hover:bg-s_blue duration-200 uppercase font-medium text-lg"
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default EditProfile;
