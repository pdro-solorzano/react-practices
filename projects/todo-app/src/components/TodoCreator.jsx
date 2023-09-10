import { useState } from "react";

function TodoCreator({ onAddTodo }) {
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    // prevent natural behavior of submit action in a form
    e.preventDefault();

    // If description is not filled, dont continue
    if (!description) return;

    // creating TODO {id - id will be added in onAddTodo, description, completed}
    let newTODO = { id: 0, description, completed: false };

    // Adding todo
    onAddTodo(newTODO);

    // clear description
    setDescription("");
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Cut onion..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export { TodoCreator };
