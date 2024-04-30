import PropTypes from "prop-types";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
const ProfilePicture = lazy(() => import("./ProfilePicture"));

const DisplayProfile = () => {
  const [edit, setEdit] = useState(false);

  const user = useSelector((state) => state.user.userProfile);

  return (
    <div
      className={`flex flex-col py-3 h-28 rounded-lg bg-s_blue shadow-md shadow-p_Blue ${
        edit && "h-48"
      }`}
    >
      <div className="flex gap-4 px-3">
        <aside className="w-3/12 h-full grid place-items-center">
          <Suspense fallback={<Loader />}>
            <ProfilePicture user={user} edit={edit} setEdit={setEdit} />
          </Suspense>
        </aside>
        <aside className="flex md:ml-4 flex-col w-[55%] h-full">
          <h2 className="text-xl font-bold capitalize">{user.name}</h2>
          <h4 className="text-slate-400">@{user.username}</h4>
          {edit && (
            <Link
              to={"/editProfile"}
              className="bg-p_Blue rounded px-5 w-32 py-1 mt-2 font-medium hover:bg-p_Blue/45 duration-200"
            >
              Edit Profile
            </Link>
          )}
        </aside>
        <button
          className="w-[10%] h-full"
          title="Edit"
          onClick={() => setEdit(!edit)}
        >
          <CiSettings size={25} />
        </button>
      </div>
    </div>
  );
};

DisplayProfile.propTypes = {
  user: PropTypes.object,
};

export default DisplayProfile;
