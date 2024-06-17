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

const getFilteredList = (list, categoriesList, searchFilter) => {
  if (categoriesList.length === 0 && searchFilter === "") {
    return list;
  } else {
    if (categoriesList.length > 0) {
      categoriesList.forEach((category) => {
        list = list.filter((el) => el.categories.includes(category));
      });
    }

    if (searchFilter.trim() !== "") {
      list = list.filter((el) =>
        el.name.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    return list;
  }
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
  const [searchFilter, setSearchFilter] = useState("");
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [actualNote, setActualNote] = useState(null);
  const [categories, setCategories] = useState(() => {
    const localStorageCategories = localStorage.getItem("categories");
    if (localStorageCategories === null) {
      // Take categories from mock data
      localStorage.setItem("categories", JSON.stringify(data.categories));
      return data.categories;
    } else {
      // Take categories from localStore data
      return JSON.parse(localStorageCategories);
    }
  });

  useEffect(() => {
    // need to update local storage with cateories state
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    // need to update local storage with notes state
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Filter Effect
  /* useEffect(() => {
    if (categoriesFilter === [] && searchFilter === "") {

    }
  }, [searchFilter, categoriesFilter]) */

  const filteredNotes = getFilteredList(notes, categoriesFilter, searchFilter);

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

  const handleCreateCategory = (category) => {
    setCategories((actualCategories) => [...actualCategories, category]);
  };

  const handleOnSearchChange = (search) => {
    setSearchFilter(search);
  };
  const handleOnSelectCategoryFilter = (category) => {
    if (categoriesFilter.includes(category)) {
      setCategoriesFilter((prevCategories) =>
        prevCategories.filter((el) => el !== category)
      );
      return;
    }
    setCategoriesFilter((prevCategories) => [...prevCategories, category]);
  };

  return (
    <section>
      <header>
        <h1>Notes App</h1>
      </header>
      <main>
        <NotesContainer
          notes={filteredNotes}
          onOpenNote={handleOpenNote}
          actualNote={actualNote}
          categories={categories}
          searchFilter={searchFilter}
          categoriesFilter={categoriesFilter}
          onSearchChange={handleOnSearchChange}
          onSelectCategoryFilter={handleOnSelectCategoryFilter}
        />
        <NoteContainer
          actualNote={actualNote}
          categories={categories}
          onAddEditNote={handleAddEditNote}
          onRemoveNote={handleRemoveNote}
          onCreateCategory={handleCreateCategory}
        />
      </main>
    </section>
  );
}

export default App;
