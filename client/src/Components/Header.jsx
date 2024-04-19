import { TiUserAdd } from "react-icons/ti";
const Header = () => {
  return (
    <header className="w-full bg-s_blue p-4 px-8 flex justify-between h-12 items-center shadow-md shadow-white/40">
      <h3 className="text-2xl font-bold">Dev.io</h3>
      <button className="grid w-10 h-10 place-items-center active:scale-125 duration-100">
        <TiUserAdd size={25} />
      </button>
    </header>
  );
};

export default Header;
