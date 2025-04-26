import React, { useState, useEffect } from 'react';
import PasswordList from './PasswordList';
import './AddTitlePassword.css';

const AddTitlePassword = () => {
    const [entries, setEntries] = useState([]); // Initialize as an empty array

    // Load data from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('passwords');
        if (stored) {
            setEntries(JSON.parse(stored));
        }
    }, []);  // Run once on component mount

    // Save data to localStorage whenever 'entries' changes
    useEffect(() => {
        if (entries.length > 0) { // Save only when entries exist
            localStorage.setItem('passwords', JSON.stringify(entries));
        }
    }, [entries]);

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const password = event.target.password.value;

        const newEntry = { title, password };
        setEntries((prev) => [...prev, newEntry]);

        event.target.reset();
    };

    return (
        <>
            <div className="field-group">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Enter title" required />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="Enter password" required />
                    <br />
                    <button type="submit">Add</button>
                </form>
            </div>
            <PasswordList entries={entries} />
        </>
    );
};

export default AddTitlePassword;
