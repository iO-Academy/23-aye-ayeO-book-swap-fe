import React, { useState, useEffect } from 'react';

function AlertBubble({ message }) {
    const [isVisible, setIsVisible] = useState('-translate-y-full');

    useEffect(() => {
        if (message) {
            setIsVisible('translate-y-0');

            const timer = setTimeout(() => {
                setIsVisible('-translate-y-full');
            }, 2000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [message]); // Watch for changes in the "message" prop

    return (
        <div
            className={`rounded-b-xl bg-[#202124] alert-bubble transition-all ease-in-out duration-600 fixed z-50 mx-auto  w-full text-center text-zinc-200 text-2xl py-10 ${isVisible}`}
        >
            {message}
        </div>
    );
}

export default AlertBubble;
