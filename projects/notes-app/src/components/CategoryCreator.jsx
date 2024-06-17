import { useState } from "react";

function CategoryCreator({ onCreateCategory }) {
  const [category, setCategory] = useState("");

  return (
    <div className="category-creator-container">
      <label htmlFor="tf-category-creator">Create a new category:</label>
      <input
        type="text"
        placeholder="Recipes..."
        name="tf-category-creator"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      <button
        style={{ backgroundColor: "blue" }}
        onClick={() => {
          if (category.trim() === "") {
            return;
          }
          onCreateCategory(category);
          setCategory("");
        }}
      >
        Create
      </button>
    </div>
  );
}

export { CategoryCreator };
