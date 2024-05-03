import axios from "axios";
import {
  API_ACTIVITY_COUNT,
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
import { getUser } from "../Utils/Authentication";

const useAPICalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userProfile);

  const handleLogin = async (e, formData, API, CODE) => {
    e.preventDefault();
    try {
      const response = await axios.post(API, formData);
      if (response.status === CODE) {
        await new Promise((resolve, reject) => {
          try {
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data?.user?._id)
            );
            resolve();
          } catch (error) {
            reject(error);
          }
        });
        const userId = getUser();
        dispatch(fetchUser(userId));
        toast.success(response?.data?.message);
        navigate("/");
      }
    } catch (error) {
      authError(error);
    }
  };

  const handleCreatePost = async (e, post, setPost) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_CREATEPOST, {
        username: user?.username,
        post,
      });
      if (response.status === 201) {
        toast.success("Post Created");
        dispatch(getAllFeeds());
        const userId = getUser();
        dispatch(fetchUserFeed(userId));
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
        await axios.put(API_ACTIVITY_COUNT, { postId, button });
        dispatch(getAllFeeds());
        const userId = getUser();
        dispatch(fetchUser(userId));
        dispatch(fetchUserFeed(userId));
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
        const userId = getUser();
        dispatch(fetchUserFeed(userId));
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
        toast.success(response?.data?.message);
        const userId = getUser();
        dispatch(fetchUser(userId));
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
