import axios from "axios";
import useCookie from "./useCookie";
import {
  API_CREATEPOST,
  API_UPDATEPOST,
  API_UPDATEPOST_ACTIVITY,
  API_UPDATE_USERPROFILE,
} from "../Utils/APIs";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, fetchUserFeed } from "../App/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import authError from "../Utils/AuthError";
import { getAllFeeds } from "../App/feedSlice";

const useAPICalls = () => {
  const { setCookie } = useCookie();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userProfile);

  const handleLogin = async (e, formData, API, CODE) => {
    e.preventDefault();
    try {
      const response = await axios.post(API, formData);
      if (response.status === CODE) {
        setCookie("userData", JSON.stringify(response.data?.user?._id), 2);
        dispatch(fetchUser());
        toast.success(response?.data?.message);
        navigate("/");
      }
    } catch (error) {
      authError(error);
    }
  };

  const handleCreatePost = async (e, post, setPost) => {
    console.log(post, user?.username);
    e.preventDefault();
    try {
      const response = await axios.post(API_CREATEPOST, {
        username: user?.username,
        post,
      });
      if (response.status === 201) {
        toast.success("Post Created");
        dispatch(getAllFeeds());
        dispatch(fetchUserFeed());
        setPost("");
        navigate("/");
      }
    } catch (error) {
      authError(error);
    }
  };

  const handleLikeSave = async (postId, button) => {
    try {
      const response = await axios.put(API_UPDATEPOST_ACTIVITY, {
        postId,
        button,
        userId: user?._id,
      });
      if (response.status === 201) {
        dispatch(getAllFeeds());
        dispatch(fetchUserFeed());
        switch (button) {
          case "like":
            toast.success("Post Liked");
            break;
          case "dislike":
            toast.success("Post Disliked");
            break;
          case "save":
            toast.success("Post Saved");
            break;
          default:
            toast.success("Post Unsaved");
            break;
        }
      }
    } catch (error) {
      authError(error);
    }
  };

  const handlePostUpdate = async (id, input, setIsEdit) => {
    try {
      const response = await axios.put(API_UPDATEPOST, { id, input });
      if (response.status === 201) {
        toast.success(response?.data?.message);
        dispatch(getAllFeeds());
        dispatch(fetchUserFeed());
        setIsEdit(false);
      }
    } catch (error) {
      authError(error);
    }
  };

  const handleEditProfile = async (e, formData) => {
    e.preventDefault();
    try {
      const response = await axios.put(API_UPDATE_USERPROFILE, formData);
      if (response.status === 201) {
        setCookie("userData", JSON.stringify(response.data?.user), 2);
        toast.success(response?.data?.message);
        dispatch(fetchUser());
        dispatch(fetchUserFeed());
        navigate("/youraccount");
      }
    } catch (error) {
      authError(error);
    }
  };

  return {
    handleLogin,
    handleCreatePost,
    handleLikeSave,
    handlePostUpdate,
    handleEditProfile,
  };
};

export default useAPICalls;
