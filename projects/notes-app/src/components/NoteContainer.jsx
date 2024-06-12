import { useEffect, useState } from "react";

function NoteContainer({ actualNote, onAddEditNote, onRemoveNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (actualNote !== null) {
      setTitle(actualNote.name);
      setContent(actualNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [actualNote]);

  return (
    <section className="note-container">
      <h3>Note</h3>
      <form
        style={{ width: "100%", display: "flex", flexDirection: "column" }}
        onSubmit={(event) => {
          event.preventDefault();
          const id = actualNote !== null ? actualNote.id : null;
          onAddEditNote({
            id,
            name: title,
            content: content,
            categories: ["category1", "category2", "category"],
          });
          setTitle("");
          setContent("");
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
