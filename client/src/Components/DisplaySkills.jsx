import { Suspense, lazy, useEffect, useState } from "react";
import Skills from "./Skills";
import { useSelector } from "react-redux";
import Loader from "./Loader";
const SkillsModal = lazy(() => import("../Modals/SkillsModal"));
import { MdEdit } from "react-icons/md";

const DisplaySkills = () => {
  const [openModal, setOpenModal] = useState(false);
  const [skill, setSkill] = useState([]);

  const user = useSelector((state) => state.user.userProfile);
  const userFeed = useSelector((state) => state.user.userFeed);

  useEffect(() => {
    setSkill(user?.skills);
  }, [user?.skills]);

  return (
    <div className="p-4 flex gap-4 flex-wrap flex-col">
      <span className="flex gap-4 items-center">
        <h1 className="text-xl font-bold uppercase text-s_blue">Skills</h1>
        <button title="Edit" onClick={() => setOpenModal(true)}>
          <MdEdit size="20" />
        </button>
      </span>
      {skill?.length > 0 ? (
        <Skills skills={skill} />
      ) : (
        <span>No Skills Added</span>
      )}

      {openModal && (
        <Suspense fallback={<Loader />}>
          <SkillsModal
            closeModal={setOpenModal}
            userId={user._id}
            skills={skill}
          />
        </Suspense>
      )}

      <div className="mt-8 w-32 py-2 px-4 text-center text-lg font-bold rounded-xl bg-s_blue">
        Post : {userFeed?.length}
      </div>
      <div className="w-40 py-2 px-4 text-center text-lg font-bold rounded-xl bg-s_blue">
        Connected : {user?.connections?.length}
      </div>
    </div>
  );
};

export default DisplaySkills;
