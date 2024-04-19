import axios from "axios";
import useCookie from "./useCookie";
import { API_CREATEPOST } from "../Utils/APIs";

const useAPICalls = async () => {
  const { getCookie } = useCookie();
  const user = getCookie("userData");

  const handlePost = async (post) => {
    try {
      const response = await axios.post(API_CREATEPOST, {
        username: user?.username,
        post,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return { handlePost };
};

export default useAPICalls;
