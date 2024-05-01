import { CgSpinner } from "react-icons/cg";
const Loader = () => {
  return (
    <div className="p-8">
      <CgSpinner className="animate-spin" size={50} />
    </div>
  );
};

export default Loader;
