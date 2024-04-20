import toast from "react-hot-toast";

const authError = (error) => {
  if (error?.response) {
    if (error.response.status === 401) toast.error(error.response.data.error);
    else if (error.response.status === 400)
      toast.error(error.response.data.error);
    else if (error.response.status === 404)
      toast.error(error.response.data.error);
    else if (error.response.status === 500)
      toast.error(error.response.data.error);
    else toast.error("Try Again");
  } else {
    toast.error("Server Not Respond");
  }
};

export default authError;
