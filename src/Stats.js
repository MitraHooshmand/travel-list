export default function Stats({ item }) {
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
