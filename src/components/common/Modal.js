import React from 'react';

// This is a generic, reusable Modal component
const Modal = ({ isOpen, onClose, title, children }) => {
    // If the modal is not open, render nothing
    if (!isOpen) {
        return null;
    }

    return (
        // The modal-backdrop is the dark semi-transparent background
        <div className="modal-backdrop" onClick={onClose}>
            {/* The modal-content is the white box in the middle */}
            {/* We use onClick e.stopPropagation() to prevent clicks inside the modal from closing it */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    {/* The close button */}
                    <button onClick={onClose} className="modal-close-btn">×</button>
                </div>
                <div className="modal-body">
                    {/* The form or other content will be passed in here */}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;