import React, { useState, useEffect } from "react";

function AlertBubble({ message }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);

            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 2000); // Disappear after 2 seconds

            return () => {
                clearTimeout(timer);
            };
        }
    }, [message]); // Watch for changes in the "message" prop

    return <div className={`alert-bubble ${isVisible ? "visible" : "hidden"}`}>{message}</div>;
}

export default AlertBubble;
