import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../Components/UserCard";
import { API_GETUSERS } from "../Utils/APIs";
import authError from "../Utils/AuthError";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../App/userSlice";
import { getUser } from "../Utils/Authentication";

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
          const userId = getUser();
          dispatch(fetchUser(userId));
          setLoading(false);
        }
      } catch (error) {
        authError(error);
      }
    };
    getUsers();
  }, [dispatch, user?._id]);

  return (
    <section className="h-screen w-full py-16 md:px-16 px-8 flex flex-col gap-8 overflow-y-auto feed">
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
              avatar={data?.avatar}
              user={user}
            />
          );
        })
      )}
    </section>
  );
};

export default UserList;
