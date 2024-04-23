import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { API_GETUSERS } from "../Utils/APIs";
import authError from "../Utils/AuthError";
import useCookie from "../Hooks/useCookie";
import Loader from "./Loader";

const UserList = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getCookie, setCookie } = useCookie();
  const user = getCookie("userData");

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.post(API_GETUSERS, { id: user?._id });
        if (response.status === 200) {
          setUsersList(response?.data?.newUsers);
          setCookie("userData", JSON.stringify(response?.data?.newUsers), 2);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        authError(error);
      }
    };
    getUsers();
  }, [user._id]);

  return (
    <section className="h-[84vh] py-5 px-16 flex flex-col gap-8">
      {loading ? (
        <Loader />
      ) : (
        usersList?.map((user) => {
          return (
            <UserCard
              key={user._id}
              name={user.name}
              username={user.username}
              id={user._id}
            />
          );
        })
      )}
    </section>
  );
};

export default UserList;
