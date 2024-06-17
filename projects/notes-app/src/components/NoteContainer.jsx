import { useEffect, useState } from "react";
import { CategoryOption } from "./CategoryOption";
import { CategoryCreator } from "./CategoryCreator";

const getCategories = (optionsList, selectionsList) => {
  return optionsList.filter((option, index) => selectionsList[index]);
};

function NoteContainer({
  actualNote,
  categories,
  onAddEditNote,
  onRemoveNote,
  onCreateCategory,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [checkedIndex, setCheckedIndex] = useState([]);

  // Update title and content with the new value of the prop actualNote
  useEffect(() => {
    if (actualNote !== null) {
      setTitle(actualNote.name);
      setContent(actualNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [actualNote]);

  // Update array checkedIndex base in the new values of the prop categories and actualNote
  useEffect(() => {
    setCheckedIndex(new Array(categories.length).fill(false));
    if (actualNote !== null) {
      setCheckedIndex(
        categories.map((category) => actualNote.categories.includes(category))
      );
    }
  }, [categories, actualNote]);

  const handleOnCheck = (index) => {
    setCheckedIndex((previous) =>
      previous.map((el, i) => (i === index ? !el : el))
    );
  };

  return (
    <section className="note-container">
      <h3>Note</h3>
      <form
        style={{ width: "100%", display: "flex", flexDirection: "column" }}
        onSubmit={(event) => {
          event.preventDefault();
          if (title.trim() === "") {
            return;
          }
          const id = actualNote !== null ? actualNote.id : null;
          onAddEditNote({
            id,
            name: title,
            content: content,
            categories: getCategories(categories, checkedIndex),
          });
          setTitle("");
          setContent("");
          setCheckedIndex([]);
        }}
      >
        <div className="note-container-title">
          <label htmlFor="tf-title">Title:</label>
          <input
            style={{ width: "100%" }}
            placeholder="Cheesecake recipe"
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="note-container-content">
          <label htmlFor="tf-content">Content note:</label>
          <textarea
            style={{ width: "100%", resize: "none", height: "200px" }}
            placeholder="2 tbs of sugar..."
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />
        </div>
        <div className="note-container-categories">
          <label htmlFor="tf-content" style={{ fontWeight: "bold" }}>
            Categories:
          </label>
          <div className="note-container-categories-container">
            {categories.map((category, index) => (
              <CategoryOption
                key={index}
                category={category}
                isChecked={checkedIndex[index]}
                onCheck={() => {
                  handleOnCheck(index);
                }}
              />
            ))}
            <hr style={{ width: "100%" }} />
            <CategoryCreator onCreateCategory={onCreateCategory} />
          </div>
        </div>
        <input
          style={{ marginTop: "16px", justifySelf: "flex-end" }}
          type="submit"
          value={actualNote !== null ? "Edit note" : "Add new note"}
        ></input>
        {actualNote !== null && (
          <button
            style={{
              marginTop: "8px",
              backgroundColor: "red",
              border: "2px solid red",
            }}
            onClick={() => {
              onRemoveNote(actualNote.id);
            }}
          >
            Delete note
          </button>
        )}
      </form>
    </section>
  );
}

export { NoteContainer };
