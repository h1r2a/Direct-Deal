// ConfirmationModal.js
import React from 'react';
import './confirmationModal.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Confirm Deletion</h3>
                <p>Are you sure you want to delete this category?</p>
                <div className="modal-actions">
                    <button onClick={onConfirm} className="confirm-button">Yes, Delete</button>
                    <button onClick={onClose} className="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
