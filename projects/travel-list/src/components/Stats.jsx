function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );
  }

  let numberItems = items.length;
  let numberPackedItems = items.reduce(
    (acc, curr) => (curr.packed ? acc + 1 : acc),
    0
  );
  let percentageItemsPacked = Math.round(
    (numberPackedItems / numberItems) * 100
  );

  return (
    <footer className="stats">
      <em>
        {`${
          percentageItemsPacked !== 100
            ? `👜 You have ${numberItems} items on your list and you already packed
        ${numberPackedItems} (${percentageItemsPacked}%)`
            : "You got everything! Ready to go 🛫"
        }`}
      </em>
    </footer>
  );
}

export { Stats };
