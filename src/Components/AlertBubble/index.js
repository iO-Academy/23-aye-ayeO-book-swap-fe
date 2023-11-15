import React, { useState, useEffect } from "react";

function AlertBubble({ message }) {
    const [isVisible, setIsVisible] = useState("-translate-y-[800px]");

    useEffect(() => {
        if (message) {
            setIsVisible("translate-y-0");

            const timer = setTimeout(() => {
                setIsVisible("-translate-y-[800px]");
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [message]); // Watch for changes in the "message" prop

    return (
        <div
            className={`rounded-xl bg-emerald-300 alert-bubble transition fixed z-50 mx-auto  w-full text-center py-10 ${
                // isVisible ? "visible" : "hidden"
                isVisible
            }`}
        >
            {message}
        </div>
    );
}

export default AlertBubble;
