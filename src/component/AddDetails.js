import React, { useState } from "react";
import "./AddDetails.css";
import AddTitlePassword from "./AddTitlePassword";

const AddDetails = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div>
        <h2 className="style">Password Keeper</h2>
        <p><bold>Total Passwords: {totalCount}</bold></p>
        <div className="search-box">
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search passwords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <AddTitlePassword 
          setTotalCount={setTotalCount} 
          searchQuery={searchQuery}
        />
      </div>
    </>
  );
};

export default AddDetails;
