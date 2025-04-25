import React from 'react';
import "./AddTitlePassword.css";

const AddTitlePassword = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const password = event.target.password.value;
        console.log("Title:", title);
        console.log("Password:", password);
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
        </>
    );
};

export default AddTitlePassword;