import "./SkillList.css";
import { Skill } from "./Skill";

function SkillList({ skills }) {
  return (
    <div className="skill-container">
      {skills.map((el, index) => (
        <Skill skill={el} key={index} />
      ))}
    </div>
  );
}

export { SkillList };
