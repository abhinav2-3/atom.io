import { useSelector } from "react-redux";
import DisplayProfile from "../Components/DisplayProfile";
import ProfileData from "../Components/ProfileData";
import YourPosts from "../Components/YourPosts";

const Account = () => {
  const user = useSelector((state) => state.user.userProfile);

  return (
    <div className="pt-8 px-8 h-[84vh] overflow-y-auto feed flex flex-col gap-8">
      <DisplayProfile user={user} />
      <ProfileData user={user} />
      <YourPosts />
    </div>
  );
};

export default Account;
