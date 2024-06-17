import { CategoriesFilter } from "./CategoriesFilter";

function NotesContainer({
  notes,
  onOpenNote,
  actualNote,
  categories,
  searchFilter,
  categoriesFilter,
  onSearchChange,
  onSelectCategoryFilter,
}) {
  return (
    <div style={{ width: "35%" }}>
      <h3>All Notes</h3>
      <CategoriesFilter
        categories={categories}
        searchFilter={searchFilter}
        categoriesFilter={categoriesFilter}
        onSearchChange={onSearchChange}
        onSelectCategoryFilter={onSelectCategoryFilter}
      />
      <ul className="notes-list">
        {notes.map((note, index) => (
          <li
            key={note.id}
            className="note-container-list"
            onClick={() => {
              onOpenNote(index);
            }}
            style={actualNote === note ? { backgroundColor: "#3170e6" } : {}}
          >
            {note.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { NotesContainer };
