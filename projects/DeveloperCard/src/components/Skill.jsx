import "./Skill.css";

function Skill({ skill }) {
  return (
    <div className="skill" style={{ backgroundColor: skill.color }}>
      <p>{skill.skill}</p>{" "}
      <span>
        {skill.level === "beginner"
          ? "👶"
          : skill.level === "intermediate"
          ? "👌"
          : "💪"}
      </span>
    </div>
  );
}

export { Skill };
