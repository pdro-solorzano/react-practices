import { useState } from "react";
import "./App.css";

// components
import { Logo } from "./components/Logo";
import { Form } from "./components/Form";
import { PackingList } from "./components/PackingList";
import { Stats } from "./components/Stats";

const initialSteps = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 10, packed: true },
];

function App() {
  const [items, setItems] = useState(initialSteps);

  function handleClearList() {
    setItems([]);
  }

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleRemoveItems(item) {
    setItems((items) => items.filter((el) => el.id !== item.id));
  }

  function handlePackedItems(item) {
    setItems((items) =>
      items.map((el) =>
        el.id === item.id ? { ...el, packed: !el.packed } : el
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onRemoveItems={handleRemoveItems}
        onPackedItems={handlePackedItems}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
