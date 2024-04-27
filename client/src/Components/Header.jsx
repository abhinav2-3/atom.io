import { TiUserAdd } from "react-icons/ti";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="w-full bg-s_blue py-2 px-8 flex justify-between items-center z-50 fixed top-0">
      <h3 className="text-2xl font-bold">Atom.io</h3>
      <Link
        title="Connections List"
        to={"/userslist"}
        className="grid w-10 h-10 place-items-center active:scale-125 duration-100"
      >
        <TiUserAdd size={25} />
      </Link>
    </header>
  );
};

export default Header;
