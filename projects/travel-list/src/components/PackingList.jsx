import { useState } from "react";
import { Item } from "./Item";

function PackingList({ items, onRemoveItems, onPackedItems, onClearList }) {
  const [sortOrder, setSortOrder] = useState("input");

  let sortedItems;
  if (sortOrder === "input") sortedItems = items;
  if (sortOrder === "description")
    sortedItems = items.toSorted((a, b) =>
      a.description.localeCompare(b.description)
    );
  if (sortOrder === "packed") {
    sortedItems = items.toSorted((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onRemoveItems={onRemoveItems}
            onPackedItems={onPackedItems}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="input">SORT BY INPUT ORDER</option>
          <option value="description">SORT BY DESCRIPTION</option>
          <option value="packed">SORT BY PACKED STATUS</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}

export { PackingList };
