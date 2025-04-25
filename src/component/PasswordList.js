import React from "react";

const PasswordList = ({ entries }) => {
    return (
        <div className="all-passwords">
            <h2>All Passwords</h2>
            <ul>
                {entries.map((entry, index) => (
                    <li key={index}>
                        <strong>{entry.title}:</strong> {entry.password}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PasswordList;