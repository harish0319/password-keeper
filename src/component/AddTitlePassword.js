import React, { useState, useEffect } from "react";
import PasswordList from "./PasswordList";
import "./AddTitlePassword.css";

const AddTitlePassword = ({ setTotalCount, searchQuery }) => {
  // Initialize state from localStorage only once
  const [entries, setEntries] = useState(() => {
    try {
      const stored = localStorage.getItem("passwords");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return [];
    }
  });
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [warning, setWarning] = useState("");

  // Save to localStorage and update count whenever entries change
  useEffect(() => {
    try {
      localStorage.setItem("passwords", JSON.stringify(entries));
      setTotalCount(entries.length);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [entries, setTotalCount]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setWarning("");

    // Check for duplicate title (case-insensitive), unless editing
    const titleExists = entries.some((entry, idx) =>
      idx !== editIndex && entry.title.trim().toLowerCase() === title.trim().toLowerCase()
    );
    if (titleExists) {
      setWarning("A password with this title already exists.");
      return;
    }

    if (editIndex !== null) {
      const updatedEntries = [...entries];
      updatedEntries[editIndex] = { title, password };
      setEntries(updatedEntries);
      setEditIndex(null);
    } else {
      const newEntry = { title, password };
      setEntries((prev) => [...prev, newEntry]);
    }
    setTitle("");
    setPassword("");
  };

  // Filter entries based on the search query
  const filteredEntries = entries.filter((entry) => {
    return (
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.password.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Update the count based on filtered entries
  useEffect(() => {
    setTotalCount(filteredEntries.length);
  }, [filteredEntries, setTotalCount]);

  return (
    <div className="container">
      <div className="field-group">
        {warning && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{warning}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">{editIndex !== null ? "Update" : "Add"}</button>
        </form>
      </div>

      <PasswordList
        entries={filteredEntries}
        setEntries={setEntries}
        setTitle={setTitle}
        setPassword={setPassword}
        setEditIndex={setEditIndex}
      />
    </div>
  );
};

export default AddTitlePassword;
