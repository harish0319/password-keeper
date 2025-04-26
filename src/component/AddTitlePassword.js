import React, { useState, useEffect } from 'react';
import PasswordList from './PasswordList';
import './AddTitlePassword.css';

const AddTitlePassword = () => {
    const [entries, setEntries] = useState([]);
    const [title, setTitle] = useState('');
    const [password, setPassword] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('passwords');
        if (stored) {
            setEntries(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('passwords', JSON.stringify(entries));
    }, [entries]);

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

        setTitle('');
        setPassword('');
    };

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
                    <button type="submit">{editIndex !== null ? 'Update' : 'Add'}</button>
                </form>
            </div>

            {/* Now only passing entries and setEntries */}
            <PasswordList 
                entries={entries} 
                setEntries={setEntries}
                setTitle={setTitle}
                setPassword={setPassword}
                setEditIndex={setEditIndex}
            />
        </>
    );
};

export default AddTitlePassword;
