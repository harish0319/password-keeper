import React, { useState, useEffect } from "react";
import PasswordList from "./PasswordList";
import "./AddTitlePassword.css";

const AddTitlePassword = ({ setTotalCount, searchQuery }) => {
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

  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(entries));
    setTotalCount(entries.length);
  }, [entries, setTotalCount]);

  const handleSubmit = (event) => {
    event.preventDefault();

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
    <>
      <div className="field-group">
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
    </>
  );
};

export default AddTitlePassword;
