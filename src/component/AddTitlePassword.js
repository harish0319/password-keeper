import React from 'react';
import "./AddTitlePassword.css";

const AddTitlePassword = () => {
    return (
        <div>
            <div className="field-group">
                <label htmlFor="title">Title:</label>
                <input id="title" type="text" placeholder="Enter title" required />
            </div>
            <div className="field-group">
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" placeholder="Enter password" required />
            </div>
            <button type="submit">Add</button>
        </div>
    );
};

export default AddTitlePassword;
