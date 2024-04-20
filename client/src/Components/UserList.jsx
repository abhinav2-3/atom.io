import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { API_GETUSERS } from "../Utils/APIs";
import authError from "../Utils/AuthError";
import useCookie from "../Hooks/useCookie";

const UserList = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getCookie } = useCookie();
  const user = getCookie("userData");

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.post(API_GETUSERS, { id: user?._id });
      if (response.status === 201) {
        setUsersList(response?.data?.newUsers);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      authError(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="h-[84vh] py-5 px-16 flex flex-col gap-8">
      {loading ? (
        <div className="text-xl grid place-items-center font-semibold">
          Loading...
        </div>
      ) : (
        usersList?.map((user) => {
          return (
            <UserCard
              key={user._id}
              name={user.name}
              username={user.username}
            />
          );
        })
      )}
    </section>
  );
};

export default UserList;
