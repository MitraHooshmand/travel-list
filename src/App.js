import { useState } from "react";
import Logo from "./Logo.js";
import Form from "./Form.js";
import PackingList from "./PackingList.js";
import Stats from "./Stats.js";
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
