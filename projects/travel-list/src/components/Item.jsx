function Item({ item, onRemoveItems, onPackedItems }) {
  function handleRemove() {
    onRemoveItems(item);
  }

  function handlePacked() {
    onPackedItems(item);
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        value={item.packed}
        onChange={handlePacked}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={handleRemove}>🚫</button>
    </li>
  );
}

export { Item };
