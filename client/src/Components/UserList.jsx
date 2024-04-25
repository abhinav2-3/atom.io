import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { API_GETUSERS } from "../Utils/APIs";
import authError from "../Utils/AuthError";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../App/userSlice";

const UserList = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userProfile);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.post(API_GETUSERS, { id: user?._id });
        if (response.status === 200) {
          setUsersList(response?.data?.newUsers);
          dispatch(fetchUser());
          setLoading(false);
        }
      } catch (error) {
        authError(error);
      }
    };
    getUsers();
  }, [dispatch, user?._id]);

  return (
    <section className="h-[84vh] py-5 px-16 flex flex-col gap-8">
      {loading ? (
        <Loader />
      ) : (
        usersList?.map((data) => {
          return (
            <UserCard
              key={data._id}
              name={data.name}
              username={data.username}
              id={data._id}
              user={user}
            />
          );
        })
      )}
    </section>
  );
};

export default UserList;
