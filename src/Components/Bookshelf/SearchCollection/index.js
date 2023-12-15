import React, { forwardRef, useState } from 'react';

function SearchCollection({ onSearchChange, searchString }, searchInput) {
    const [isFocused, setIsFocused] = useState(false);

    function onSearch(string) {
        onSearchChange(string);
    }

    return (
        <div
            className={`flex flex-row items-center gap-3 rounded-md bg-zinc-50 px-3 text-slate-600 ${
                isFocused ? 'ring-4 ring-lime-500/30' : ''
            }`}
        >
            <label htmlFor='search-bar' className='sr-only'>
                Search{' '}
            </label>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                viewBox='0 -960 960 960'
                width='24'
                fill='currentColor'
            >
                <path d='M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z' />
            </svg>
            <input
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => onSearch(e.target.value)}
                ref={searchInput}
                id='search-bar'
                type='text'
                value={searchString}
                className='text-md bg-zinc-50  p-2 pl-0 outline-none'
                placeholder='Search books'
            ></input>
        </div>
    );
}

export default forwardRef(SearchCollection);
