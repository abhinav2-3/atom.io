import DisplayProfile from "../Components/DisplayProfile";
import Feed from "../Components/Feed";
import SideNavbar from "../Components/SideNavbar";

const Home = () => {
  return (
    <div className="w-full h-full flex border">
      <SideNavbar />
      <Feed />
      <DisplayProfile />
    </div>
  );
};

export default Home;
