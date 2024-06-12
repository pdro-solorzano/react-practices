import "./App.css";
import { NotesContainer } from "./components/NotesContainer";
import { NoteContainer } from "./components/NoteContainer";
import data from "./mocks/notes.json";
import { useEffect, useState } from "react";

const getNewId = (list) => {
  return (
    list.reduce((prev, curr) => (prev.id > curr.id ? prev.id : curr.id), 0) + 1
  );
};

function App() {
  const [notes, setNotes] = useState(() => {
    const localStorageNotes = localStorage.getItem("notes");
    if (localStorageNotes === null) {
      localStorage.setItem("notes", JSON.stringify(data.notes));
      return data.notes;
    } else {
      return JSON.parse(localStorageNotes);
    }
  });
  const [actualNote, setActualNote] = useState(null);

  useEffect(() => {
    // need to update local storage with notes state
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleOpenNote = (index) => {
    const note = notes[index];
    if (actualNote === note) {
      setActualNote(null);
      return;
    }
    setActualNote(note);
  };

  const handleAddEditNote = (note) => {
    if (notes.some((el) => el.id === note.id)) {
      setNotes((previous) =>
        previous.map((el) => (el.id === note.id ? note : el))
      );
    } else {
      note.id = getNewId(notes);
      setNotes((previous) => [...previous, note]);
    }
    setActualNote(null);
  };

  const handleRemoveNote = (id) => {
    setNotes((previous) => previous.filter((el) => el.id !== id));
    setActualNote(null);
  };

  return (
    <section>
      <header>
        <h1>Notes App</h1>
      </header>
      <main>
        <NotesContainer
          notes={notes}
          onOpenNote={handleOpenNote}
          actualNote={actualNote}
        />
        <NoteContainer
          actualNote={actualNote}
          onAddEditNote={handleAddEditNote}
          onRemoveNote={handleRemoveNote}
        />
      </main>
    </section>
  );
}

export default App;
