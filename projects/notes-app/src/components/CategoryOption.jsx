function CategoryOption({ category, isChecked, onCheck }) {
  return (
    <span className="category-option-container">
      <label htmlFor={category}>{category}</label>
      <input
        name={category}
        type="checkbox"
        value={category}
        checked={isChecked}
        onChange={onCheck}
      />
    </span>
  );
}

export { CategoryOption };
