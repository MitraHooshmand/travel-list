export default function Item({ item, onDeleteHandler, onToggleHandler }) {
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
