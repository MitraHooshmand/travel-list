import { useState } from "react";
import Item from "./Item";
export default function PackingList({
  items,
  onDeleteHandler,
  onToggleHandler,
  onClearHandler,
}) {
  const [sortBy, SetSortBy] = useState("input");
  let sortCriteria;
  if (sortBy === "input") sortCriteria = items;
  if (sortBy === "description")
    sortCriteria = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortCriteria = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortCriteria.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteHandler={onDeleteHandler}
            onToggleHandler={onToggleHandler}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => SetSortBy(e.target.value)}>
          <option value="input">Sorted by input order</option>
          <option value="description">Sorted by description</option>
          <option value="packed">Sorted by packed status</option>
        </select>
        <button onClick={onClearHandler}>Clear</button>
      </div>
    </div>
  );
}
