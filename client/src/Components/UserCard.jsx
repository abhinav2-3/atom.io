import PropTypes from "prop-types";
import { TiUserAdd } from "react-icons/ti";
const UserCard = ({ name, username }) => {
  return (
    <div className="py-2 px-4 w-full flex justify-between shadow-lg rounded-lg shadow-p_Blue/40">
      <aside className="flex flex-col items-start">
        <h1 className="text-2xl font-bold">{name}</h1>
        <h4 className="text-slate-400 lowercase">@{username}</h4>
        <button className="text-p_Blue text-lg font-semibold flex gap-2 items-center hover:text-p_Blue/80 duration-200">
          Connect <TiUserAdd />
        </button>
      </aside>
      <figure className="rounded-full w-20 h-20 p-1 border"></figure>
    </div>
  );
};

UserCard.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
};

export default UserCard;
