import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Book", quantity: 1, packed: false },
];

export default function App() {
  const [item, setItem] = useState(initialItems);

  function handleAddItems(item) {
    setItem((items) => [...items, item]);
  }
  function deleteHandler(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }
  function toggleHandler(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function clearHandler() {
    const confirmed = window.confirm("⚠ Are you sure to clear the list?");
    if (confirmed) setItem([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={item}
        onDeleteHandler={deleteHandler}
        onToggleHandler={toggleHandler}
        onClearHandler={clearHandler}
      />
      <Stats item={item} />
    </div>
  );
}

function Logo() {
  return <h1> Far Away🌴🌊</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);
    setQuantity(1);
    setDescription("");
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <input
        placeholder="Enter an item ...."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>add</button>
    </form>
  );
}
function PackingList({
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
function Item({ item, onDeleteHandler, onToggleHandler }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onClick={() => {
          onToggleHandler(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
        <button onClick={() => onDeleteHandler(item.id)}>❌</button>
      </span>
    </li>
  );
}
function Stats({ item }) {
  const numPacked = item.filter((item) => item.packed).length;

  return (
    <footer className="stats">
      {numPacked === item.length ? (
        <em>Ready to go! 🛫</em>
      ) : (
        <em>
          you have {item.length} items in your list, and you already packed {""}
          {numPacked} ({Math.round((numPacked / item.length) * 100)}%)
        </em>
      )}
    </footer>
  );
}
