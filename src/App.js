import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handelAddItems(item) {
    setItems(items => [...items, item]);
  }

  function handelDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handelToggleItem(id) {
    setItems(items =>
      items.map(item => (item.id === id ? { ...item, packed: !item.packed } : item))
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handelAddItems} />
      <PackingList items={items} onDeleteItem={handelDeleteItem} onToggleItem={handelToggleItem} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> 🛳️ Far Away 👜 </h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handelSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { quantity, description, id: Date.now(), packed: false };
    console.log(newItem);

    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handelSubmit}>
      <h3> What do you need for your trip 💼 </h3>
      <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
        ))}
      </ul>
      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="input">Sort by input order</option>
        <option value="description">Sort by description</option>
        <option value="packed">Sort by packed status</option>
      </select>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length) {
    return <p className="stats">Start adding some items to your packing list 🚀</p>;
  }

  const itemLength = items.length;
  const itemPacked = items.filter(item => item.packed).length;
  const itemPercentage = Math.round((itemPacked / itemLength) * 100);
  return (
    <footer className="stats">
      <em>
        {itemPercentage === 100
          ? "You have packed all the items... Ready to go✈️"
          : `💼 You have ${itemLength} items on your list, and you already packed ${itemPacked} ${itemPercentage}%`}
      </em>
    </footer>
  );
}
