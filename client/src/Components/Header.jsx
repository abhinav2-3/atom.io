import { TiUserAdd } from "react-icons/ti";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="w-full bg-opacity-50 bg-p_black backdrop-blur-sm z-50 fixed top-0">
      <div className="flex justify-between items-center py-2 px-16">
        <h3 className="text-2xl font-bold">Atom.io</h3>
        <input
          type="search"
          name="search"
          placeholder="Search People"
          className="bg-transparent outline-none border border-s_blue rounded px-4 py-2 w-96"
        />
        <Link
          title="Connections List"
          to={"/userslist"}
          className="grid w-10 h-10 place-items-center active:scale-125 duration-100"
        >
          <TiUserAdd size={25} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
