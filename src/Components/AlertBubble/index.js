import React, { useState, useEffect } from 'react';

function AlertBubble({ message }) {
    const [position, setPosition] = useState('translate-y-full -z-50');

    useEffect(() => {
        if (message) {
            setPosition('-translate-y-5');

            const timer = setTimeout(() => {
                setPosition('translate-y-full -z-50');
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
        //useEffect for it to chenge based on screen orientation as well
    }, [message]); // Watch for changes in the "message" prop

    return (
        <div className='flex items-center justify-center'>
            <div
                className={`rounded-[30px] backdrop-blur-sm bg-slate-800/80 transition-all ease-in-out duration-1600 fixed bottom-0 z-50 sm:w-full w-[95vw] max-w-[800px] text-center text-zinc-100 text-2xl py-8 ${position}`}
            >
                {message}
            </div>{' '}
        </div>
    );
}

export default AlertBubble;
