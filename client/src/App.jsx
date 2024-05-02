import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { getAllFeeds } from "./App/feedSlice";
import PrivateComponents from "./Utils/PrivateComponents";
import { fetchUser, fetchUserFeed } from "./App/userSlice";
import Loader from "./Components/Loader";
import Message from "./Pages/Message";
import Bookmarks from "./Pages/Bookmarks";
import SideNavbar from "./Components/SideNavbar";
import RightSidebar from "./Components/RightSidebar";
import { getUser } from "./Utils/Authentication";

const CreatePost = lazy(() => import("./Pages/CreatePost"));
const Account = lazy(() => import("./Pages/Account"));
const EditProfile = lazy(() => import("./Pages/EditProfile"));
const UserList = lazy(() => import("./Pages/UserList"));

function App() {
  const dispatch = useDispatch();
  const userId = getUser();

  useEffect(() => {
    dispatch(getAllFeeds());
    dispatch(fetchUserFeed(userId));
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  return (
    <Router>
      <Toaster />
      <div className="w-full h-full bg-p_black text-p_text flex justify-between">
        <SideNavbar />
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<PrivateComponents />}>
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/youraccount" element={<Account />} />
              <Route path="/editProfile" element={<EditProfile />} />
              <Route path="/userslist" element={<UserList />} />
              <Route path="/message" element={<Message />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
        <RightSidebar />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
