function CategoriesFilter({
  categories,
  searchFilter,
  categoriesFilter,
  onSearchChange,
  onSelectCategoryFilter,
}) {
  return (
    <>
      <div className="filter-container">
        <label htmlFor="tf-filter">Filter:</label>
        <input
          type="text"
          placeholder="Cake recipe..."
          name="tf-filter"
          value={searchFilter}
          onChange={(e) => {
            onSearchChange(e.target.value);
          }}
        />
      </div>
      <div className="categories-filter-container">
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              style={
                categoriesFilter.includes(category)
                  ? {
                      backgroundColor: "#b63a3a",
                    }
                  : {}
              }
              onClick={() => {
                onSelectCategoryFilter(category);
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export { CategoriesFilter };
