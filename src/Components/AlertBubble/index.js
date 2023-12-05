import React, { useState, useEffect } from 'react';

function AlertBubble({ message }) {
    const [position, setPosition] = useState('translate-y-full -z-50');

    useEffect(() => {
        if (message) {
            setPosition('translate-y-5');

            const timer = setTimeout(() => {
                setPosition('-translate-y-full -z-50');
            }, 4000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [message]); // Watch for changes in the "message" prop

    return (
        <div className='flex items-center justify-center'>
            <div
                className={`rounded-[30px] backdrop-blur-sm bg-lime-600/100 transition-all ease-in-out duration-600 fixed top-0 z-50 sm:w-max w-[95vw] max-w-[800px] text-center text-zinc-100 text-xl px-10 p-4 ${position} flex flex-row items-center justify-center gap-2`}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='24'
                    viewBox='0 -960 960 960'
                    width='24'
                    fill='currentColor'
                >
                    <path d='m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z' />
                </svg>
                {message}
            </div>{' '}
        </div>
    );
}

export default AlertBubble;
