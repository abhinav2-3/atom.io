import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Header = () => {
  const [image, setImage] = useState("");
  const user = useSelector((state) => state.user.userProfile);
  useEffect(() => {
    user?.avatar && setImage(user?.avatar);
  }, [user.avatar]);

  return (
    <header className="w-full bg-opacity-50 bg-p_black backdrop-blur-sm z-50 fixed top-0">
      <div className="flex justify-between items-center py-2 px-4 md:px-16">
        <h3 className="text-2xl font-bold">Atom.io</h3>
        <input
          type="search"
          name="search"
          placeholder="Search People"
          className="bg-transparent outline-none border border-s_blue rounded px-4 py-2 w-1/2 md:w-96"
        />
        <Link
          title="Account"
          to={"/youraccount"}
          className="grid w-10 h-10 place-items-center active:scale-125 duration-100"
        >
          <figure className="w-10 h-10 rounded-full overflow-hidden border border-s_blue">
            {image === "" || image === null || image === undefined ? (
              <FaUserCircle className="w-full h-full" />
            ) : (
              <img
                src={image}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </figure>
        </Link>
      </div>
    </header>
  );
};

export default Header;
