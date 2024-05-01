import { useDispatch } from "react-redux";
import Feed from "../Components/Feed";
import { useEffect } from "react";
import { fetchUser } from "../App/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return <Feed />;
};

export default Home;
