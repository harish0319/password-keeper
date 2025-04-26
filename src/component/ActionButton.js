import React from 'react';

const ActionButton = ({ onEdit, onDelete }) => {
    return (
        <div className="action-buttons">
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>    
        </div>
    );
};

export default ActionButton;