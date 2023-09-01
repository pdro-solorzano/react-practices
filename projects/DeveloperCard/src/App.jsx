import "./App.css";
import { data } from "./data";

// Components
import { Avatar } from "./components/Avatar";
import { TitleCard } from "./components/TitleCard";
import { DescriptionCard } from "./components/DescriptionCard";
import { SkillList } from "./components/SkillList";

function App() {
  return (
    <div className="card-container">
      <Avatar imageUrl={data.imageUrl} name={data.name} />
      <section className="content">
        <TitleCard name={data.name} />
        <DescriptionCard description={data.aboutMe} />
        <SkillList skills={data.skills} />
      </section>
    </div>
  );
}

export default App;
