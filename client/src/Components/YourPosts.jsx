import { useEffect, useState } from "react";
import useCookie from "../Hooks/useCookie";
import Card from "./Card";
import axios from "axios";
import { API_USERPOSTS } from "../Utils/APIs";
import authError from "../Utils/AuthError";
import toast from "react-hot-toast";

const YourPosts = () => {
  const [userFeed, setUserFeed] = useState([]);

  const { getCookie } = useCookie();
  const user = getCookie("userData");

  const getUserFeed = async () => {
    try {
      const response = await axios.post(API_USERPOSTS, { id: user?._id });
      if (response.status === 201) {
        setUserFeed(response?.data?.posts);
      }
    } catch (error) {
      error?.response ? authError(error) : toast.error("Server not Respond");
    }
  };

  useEffect(() => {
    getUserFeed();
  }, []);

  return (
    <section className="p-4 flex flex-col border-t">
      <h1 className="text-xl font-bold text-center pb-4">
        Your Posts: {userFeed.length}
      </h1>
      <div className="w-full">
        {userFeed?.map((data) => {
          return <Card key={data._id} {...data} />;
        })}
      </div>
    </section>
  );
};

export default YourPosts;
