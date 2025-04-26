import React from "react";
import ActionButton from "./ActionButton";
import "./PasswordList.css";

const PasswordList = ({ entries, setEntries, setTitle, setPassword, setEditIndex }) => {

    const handleEdit = (index) => {
        const entry = entries[index];
        setTitle(entry.title);
        setPassword(entry.password);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedEntries = entries.filter((_, idx) => idx !== index);
        setEntries(updatedEntries);
        setEditIndex(null);
        setTitle('');
        setPassword('');
    };

    return (
        <div className="all-passwords">
            <h2>All Passwords</h2>
            {entries.length === 0 ? (
                <p>No passwords saved yet.</p>
            ) : (
                <ul>
                    {entries.map((entry, index) => (
                        <li key={index}>
                            <strong>{entry.title}:</strong> {entry.password}
                            <ActionButton
                                onEdit={() => handleEdit(index)}
                                onDelete={() => handleDelete(index)}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PasswordList;
