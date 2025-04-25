import React, { useState } from 'react';
import PasswordList from './PasswordList';
import "./AddTitlePassword.css";

const AddTitlePassword = () => {
    const [entries, setEntries] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const password = event.target.password.value;
        
        const newEntry = { title, password };
        setEntries([...entries, newEntry]);
        event.target.reset();
    }

    return (
        <>
            <div className="field-group" >
                <form onSubmit={handleSubmit}>
                   <label htmlFor="title">Title:</label>
                    <input id="title" type="text" placeholder="Enter title" required />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" placeholder="Enter password" required />
                    <br />
                    <button type="submit">Add</button> 
                </form>
            </div>
            <PasswordList entries={entries} />
        </>
    );
};

export default AddTitlePassword;