export default function App() {
  return (
    <>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </>
  );
}

function Logo() {
  return <h1> Far Away🌴🌊</h1>;
}
function Form() {
  return (
    <div className="add-form">
      <h3>What you need for your trip?</h3>
    </div>
  );
}
function PackingList() {
  return <div className="list">list</div>;
}
function Stats() {
  return (
    <footer>
      <em>you have X items in your list</em>
    </footer>
  );
}
