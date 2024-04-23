import { Link } from "react-router-dom";
import useCookie from "../Hooks/useCookie";
import SkillsModal from "../Modals/SkillsModal";
import { useEffect, useState } from "react";
import Skills from "./Skills";
import ProfilePicture from "./ProfilePicture";

const DisplayProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [skill, setSkill] = useState([]);

  const { getCookie } = useCookie();
  const user = getCookie("userData");

  useEffect(() => {
    setSkill(user.skills);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  return (
    <div className="flex flex-col py-3 rounded-lg h-full  shadow-md shadow-p_Blue">
      <div className="flex justify-between items-center">
        <aside className="w-1/3 h-full grid place-items-center">
          <ProfilePicture userId={user._id} />
        </aside>
        <aside className="flex flex-col flex-1 h-full justify-center ml-20">
          <h2 className="text-xl font-bold ">{user.name}</h2>
          <h4 className="text-slate-400">@{user.username}</h4>
          <Link
            to={"/editProfile"}
            className="bg-p_Blue rounded w-4/5 px-10 py-1 mt-2 font-medium hover:bg-p_Blue/45 duration-200"
          >
            Edit Profile
          </Link>
        </aside>
      </div>
      <article className="p-4 flex gap-4 flex-wrap">
        {skill?.length > 0 && <Skills skills={skill} />}
        <button
          onClick={() => setOpenModal(true)}
          className="bg-p_Blue py-1 px-3 rounded"
        >
          Add Skills
        </button>
        {openModal && (
          <SkillsModal
            closeModal={setOpenModal}
            userId={user._id}
            skills={skill}
          />
        )}
      </article>
    </div>
  );
};

export default DisplayProfile;
