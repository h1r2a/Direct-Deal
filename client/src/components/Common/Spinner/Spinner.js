// Spinner.js
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import './spinner.css';

const Spinner = forwardRef((_, ref) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        show: () => setVisible(true),
        hide: () => setVisible(false),
    }));

    if (!visible) return null;

    return (
        <div className="spinner-overlay">
            <div className="spinner"></div>
        </div>
    );
});

export default Spinner;
