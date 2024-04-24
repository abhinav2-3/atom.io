import PropTypes from "prop-types";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import SkillsModal from "../Modals/SkillsModal";
import { useEffect, useState } from "react";
import Skills from "./Skills";
import ProfilePicture from "./ProfilePicture";
import { useSelector } from "react-redux";

const DisplayProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [skill, setSkill] = useState([]);

  const user = useSelector((state) => state.user.userProfile);

  useEffect(() => {
    setSkill(user.skills);
  }, [user.skills]);

  return (
    <div className="flex flex-col py-3 rounded-lg h-full shadow-md shadow-p_Blue">
      <div className="flex justify-between items-center relative">
        <aside className="w-1/3 h-full grid place-items-center">
          <ProfilePicture user={user} edit={edit} setEdit={setEdit} />
        </aside>
        <aside className="flex flex-col w-[60%] h-full justify-center ml-20">
          <h2 className="text-xl font-bold ">{user.name}</h2>
          <h4 className="text-slate-400">@{user.username}</h4>
          {edit && (
            <Link
              to={"/editProfile"}
              className="bg-p_Blue rounded w-4/5 px-10 py-1 mt-2 font-medium hover:bg-p_Blue/45 duration-200"
            >
              Edit Profile
            </Link>
          )}
        </aside>
        <button
          className="w-7 right-2 absolute top-0"
          title="Edit"
          onClick={() => setEdit(!edit)}
        >
          <FaUserEdit size={25} />
        </button>
      </div>
      <article className="p-4 flex gap-4 flex-wrap">
        {skill?.length > 0 && <Skills skills={skill} />}
        {edit && (
          <button
            onClick={() => setOpenModal(true)}
            className="bg-p_Blue py-1 px-3 rounded"
          >
            Add Skills
          </button>
        )}

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

DisplayProfile.propTypes = {
  user: PropTypes.object,
};

export default DisplayProfile;
