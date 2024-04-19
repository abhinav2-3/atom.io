import PropTypes from "prop-types";
const Button = ({ title, type }) => {
  return (
    <button
      type={type}
      className="bg-p_Blue rounded px-10 py-1 mt-2 font-medium hover:bg-p_Blue/45 duration-200"
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export default Button;
