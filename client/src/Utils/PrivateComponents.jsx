import { Outlet, Navigate } from "react-router-dom";
import useCookie from "../Hooks/useCookie";

const PrivateComponents = () => {
  const { getCookie } = useCookie();
  const user = getCookie("userData");
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateComponents;
