import React, { useState } from "react";
import "./AddDetails.css";
import AddTitlePassword from "./AddTitlePassword";

const AddDetails = () => {
  const [totalCount, setTotalCount] = useState(0);

 return (
    <>
        <div>
            <h2 className="style">Password Keeper</h2>
            <p>Total Passwords: {totalCount}</p>
            <AddTitlePassword setTotalCount={setTotalCount} />
            
        </div>  
    </>
  );
};

export default AddDetails;