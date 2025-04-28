import "./App.css";
import { useState } from "react";
import React from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 8, packed: false },
//   { id: 3, description: "Book", quantity: 2, packed: true },
//   { id: 4, description: "Sunglass", quantity: 2, packed: true },
// ];

function App() {
  const [items, setItems] = useState([]);

  function handelAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handelTogglePacked(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }
  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItems={handelAddItems} />
        <PackingList
          items={items}
          onDeleteItem={handleDeleteItem}
          onToggleItem={handelTogglePacked}
        />
        <Stats />
      </div>
    </>
  );
}

function Logo() {
  return <h1>🌴Travel Items 👜</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now() + Math.random(),
    };
    console.log(newItem);
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
    // setPacked(false);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <option value={i + 1} key={i}>
            {i + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <ul className="list">
      {items.map((item) => (
        <Item
          item={item}
          onDeleteItem={onDeleteItem}
          onToggleItem={onToggleItem}
          key={item.id}
        />
      ))}
    </ul>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={{ textDecoration: item.packed ? "line-through" : "" }}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>
        👜Total items: 0 Items packed: 0 Items left: 0 Packed percentage: x %
      </em>
    </footer>
  );
}
export default App;
