import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { API_ADDSKILLS } from "../Utils/APIs";
import authError from "../Utils/AuthError";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchUser } from "../App/userSlice";
import { getUser } from "../Utils/Authentication";

const SkillsModal = ({ closeModal, userId, skills }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSkill, setSelectedSkills] = useState([]);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedSkills(skills);
  }, []);

  const handleSelectedSkill = (e) => {
    e.preventDefault();
    setSelectedSkills([...selectedSkill, input]);
    setInput("");
    inputRef.current.focus();
  };

  const handleRemoveSkill = (data) => {
    const updatedSkills = selectedSkill.filter((currEle) => currEle !== data);
    setSelectedSkills(updatedSkills);
  };

  const submitSkills = async () => {
    setLoading(true);
    try {
      const response = await axios.put(API_ADDSKILLS, {
        userId,
        skills: selectedSkill,
      });
      if (response.status === 201) {
        toast.success(response.data.message);
        const userId = getUser();
        dispatch(fetchUser(userId));
        closeModal(false);
      }
      setLoading(false);
    } catch (error) {
      authError(error);
    }
  };

  return (
    <div className="fixed z-50 inset-0 w-full bg-p_black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-p_black px-8 py-4 w-1/2 h-3/5 rounded relative">
        <button
          className="absolute top-3 right-4 bg-white p-1 rounded"
          onClick={() => closeModal(false)}
        >
          <RxCross2 size={25} color="red" />
        </button>

        <h1 className="pb-4 font-semibold text-center text-xl mt-2">
          Add Your Skills
        </h1>
        <form
          className="flex flex-col w-full flex-wrap gap-4"
          onSubmit={handleSelectedSkill}
        >
          <div className="flex justify-around bg-inherit rounded-lg w-full flex-wrap gap-4">
            <input
              type="text"
              ref={inputRef}
              name="skill"
              placeholder="React.js"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent border border-p_Blue outline-none py-2 px-2 w-2/3 rounded-lg"
            />
            <button type="submit" className="bg-s_blue px-4 py-1 rounded-2xl">
              Add
            </button>
            <ul className="flex gap-2 flex-wrap overflow-y-auto max-h-48 feed">
              {selectedSkill?.map((data, index) => {
                return (
                  <li
                    key={index}
                    className="bg-slate-800 rounded-2xl py-1 px-3 flex justify-center gap-2"
                  >
                    <span>{data}</span>
                    <button onClick={() => handleRemoveSkill(data)}>
                      <RxCross2 size={22} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            type="button"
            onClick={submitSkills}
            className={`bg-p_text text-p_Blue hover:bg-p_Blue hover:text-p_text duration-200 ml-8 font-semibold text-xl px-4 py-1 rounded w-32 ${
              loading && "pointer-events-none w-40"
            }`}
          >
            {loading ? "Submiting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

SkillsModal.propTypes = {
  closeModal: PropTypes.func,
  userId: PropTypes.string,
  skills: PropTypes.array,
};

export default SkillsModal;
