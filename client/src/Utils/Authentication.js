export const getUser = () => {
  const data = localStorage.getItem("userData");
  const userId = JSON.parse(data);
  return userId;
};
