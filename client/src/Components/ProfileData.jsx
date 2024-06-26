import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaHeart, FaBookmark } from "react-icons/fa";

const ProfileData = ({ user }) => {
  return (
    <section className="flex justify-around items-center py-2">
      <div>
        <span className="text-xl font-semibold">Connections : </span>
        <span className="text-xl font-bold text-p_Blue">
          {user.connections.length}
        </span>
      </div>
      <div className="flex gap-4">
        <Link
          to={"/yourlikes"}
          className="flex flex-col justify-center items-center"
        >
          <FaHeart
            size={20}
            color="red"
            className="hover:scale-125 duration-100"
          />
          <span className="text-sm">Likes Post</span>
        </Link>

        <Link
          to={"yourbookmarks"}
          className="flex flex-col justify-center items-center"
        >
          <FaBookmark
            size={20}
            color="blue"
            className="hover:scale-125 duration-100"
          />
          <span className="text-sm">Saved Post</span>
        </Link>
      </div>
    </section>
  );
};

ProfileData.propTypes = {
  user: PropTypes.object,
};

export default ProfileData;
