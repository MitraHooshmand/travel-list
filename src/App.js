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
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={item}
        onDeleteHandler={deleteHandler}
        onToggleHandler={toggleHandler}
      />
      <Stats />
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
function PackingList({ items, onDeleteHandler, onToggleHandler }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteHandler={onDeleteHandler}
            onToggleHandler={onToggleHandler}
          />
        ))}
      </ul>
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
function Stats() {
  return (
    <footer className="stats">
      <em>you have X items in your list</em>
    </footer>
  );
}
