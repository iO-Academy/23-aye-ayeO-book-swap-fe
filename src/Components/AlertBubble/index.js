import React, { useState, useEffect } from 'react';

function AlertBubble({ message }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);

            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 4000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [message]); // Watch for changes in the "message" prop

    return (
        <div
            className={`rounded-full bg-lime-200 alert-bubble ${
                isVisible ? 'visible' : 'hidden'
            }`}
        >
            {message}
        </div>
    );
}

export default AlertBubble;
