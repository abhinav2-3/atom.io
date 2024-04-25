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

const CreatePost = lazy(() => import("./Pages/CreatePost"));
const Account = lazy(() => import("./Pages/Account"));
const EditProfile = lazy(() => import("./Components/EditProfile"));
const UserList = lazy(() => import("./Components/UserList"));

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
        <Suspense fallback={<Loader />}>
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
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
