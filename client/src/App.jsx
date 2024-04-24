import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import CreatePost from "./Pages/CreatePost";
import Account from "./Pages/Account";
import EditProfile from "./Components/EditProfile";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllFeeds } from "./App/feedSlice";
import UserList from "./Components/UserList";
import PrivateComponents from "./Utils/PrivateComponents";
import { fetchUser, fetchUserFeed } from "./App/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFeeds());
    dispatch(fetchUserFeed());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="bg-p_black text-white">
      <Toaster />
      <Router>
        <Header />
        <Routes>
          <Route element={<PrivateComponents />}>
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/youraccount" element={<Account />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/userslist" element={<UserList />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
