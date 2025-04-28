import React, { useState, useEffect } from "react";
import PasswordList from "./PasswordList";
import "./AddTitlePassword.css";

const AddTitlePassword = ({ setTotalCount, searchQuery }) => {
  const [entries, setEntries] = useState("[]");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("passwords");
    if (stored) {
      setEntries(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("passwords", entries);
    setTotalCount(JSON.parse(entries).length);
  }, [entries, setTotalCount]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentEntries = JSON.parse(entries);
    setWarning("");

    const titleExists = currentEntries.some((entry, idx) =>
      idx !== editIndex && entry.title.trim().toLowerCase() === title.trim().toLowerCase()
    );
    if (titleExists) {
      setWarning("Title already exists. Please choose a different title.");
      return;
    }
    if (editIndex !== null) {
      currentEntries[editIndex] = { title, password };
      setEntries(JSON.stringify(currentEntries));
      setEditIndex(null);
    } else {
      const newEntry = { title, password };
      setEntries(JSON.stringify([...currentEntries, newEntry]));
    }

    setTitle("");
    setPassword("");
  };

  const filteredEntries = JSON.parse(entries).filter((entry) => {
    return (
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.password.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  useEffect(() => {
    setTotalCount(filteredEntries.length);
  }, [filteredEntries, setTotalCount]);

  return (
    <>
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
    </>
  );
};

export default AddTitlePassword;
