import { useDispatch } from "react-redux";
import Feed from "../Components/Feed";
import { useEffect } from "react";
import { fetchUser } from "../App/userSlice";
import { getUser } from "../Utils/Authentication";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userId = getUser();
    dispatch(fetchUser(userId));
  }, [dispatch]);
  return <Feed />;
};

export default Home;
