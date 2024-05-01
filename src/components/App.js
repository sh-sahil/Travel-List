import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

  function handelClearList() {
    const confirmed = window.confirm("Are you sure you want to delete all items?");
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handelAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handelDeleteItem}
        onToggleItem={handelToggleItem}
        onClearList={handelClearList}
      />
      <Stats items={items} />
    </div>
  );
}
