import { Outlet, Navigate } from "react-router-dom";

const PrivateComponents = () => {
  const data = localStorage.getItem("userData");
  let user;
  if (data) user = JSON.parse(data);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateComponents;
