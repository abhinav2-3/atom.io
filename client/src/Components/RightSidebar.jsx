import DisplayProfile from "./DisplayProfile";
import DisplaySkills from "./DisplaySkills";

const RightSidebar = () => {
  return (
    <div className="w-[45%] md:pt-20 px-4 md2:flex flex-col gap-8 hidden">
      <DisplayProfile />
      <DisplaySkills />
    </div>
  );
};

export default RightSidebar;
