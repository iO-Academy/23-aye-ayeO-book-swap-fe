import React, { useState, useEffect } from "react";

function AlertBubble({ message }) {
    const [position, setPosition] = useState("translate-y-full");
    useEffect(() => {
        if (message) {
            setPosition("-translate-y-5");

            const timer = setTimeout(() => {
                setPosition("translate-y-full");
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [message]); // Watch for changes in the "message" prop

    return (
        <div className=" flex items-center justify-center ">
            <div
                className={`rounded-[30px] bg-zinc-800 opacity-95 transition-all ease-in-out duration-1600 fixed bottom-0
         z-10 w-full max-w-[800px] text-center text-zinc-100 text-2xl py-8 ${position}`}
            >
                {message}
            </div>{" "}
        </div>
    );
}

export default AlertBubble;
