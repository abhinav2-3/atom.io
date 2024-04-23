/* eslint-disable react/prop-types */
const Skills = ({ skills }) => {
  const skillElements = skills?.map((data, index) => {
    return (
      <span key={index} className="bg-slate-600 p-1 px-3 text-sm rounded ">
        {data}
      </span>
    );
  });

  return <div className="flex gap-3 flex-wrap">{skillElements}</div>;
};

export default Skills;
