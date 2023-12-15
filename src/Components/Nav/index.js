import { NavLink } from 'react-router-dom';
import React from 'react';
import './nav.css';
import Logo from '../Logo';

function Nav() {
    return (
        <div className='relative z-40 w-full bg-[#343450] sm:fixed'>
            <nav className='m-auto flex w-full max-w-7xl flex-col justify-between gap-3 px-4 pb-2 text-slate-800 min-[500px]:flex-row sm:py-2'>
                <span className='justify-center text-3xl font-semibold'>
                    <Logo />
                </span>
                <div className='sm:justified-end text-md flex items-center justify-center gap-6 text-white transition'>
                    <NavLink
                        to='/'
                        className='duration-2000 transition-all hover:text-[#ef9b9b]'
                    >
                        Available
                    </NavLink>
                    <NavLink
                        to='/claimed'
                        className='duration-2000 transition-all hover:text-[#ef9b9b]'
                    >
                        Claimed
                    </NavLink>
                    <NavLink to='/books/add'>
                        <button className='background-animate-slow group group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-amber-300 to-[#ef9b9b] p-0.5 text-sm font-semibold text-white hover:text-[#343450]'>
                            <span className='relative flex flex-row items-center gap-1 rounded-md  bg-[#343450] px-4 py-2 transition-all duration-100 ease-in group-hover:bg-opacity-0'>
                                <svg
                                    height='20'
                                    viewBox='0 -960 960 960'
                                    width='20'
                                    fill='currentColor'
                                >
                                    <path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z' />
                                </svg>
                                Add book
                            </span>
                        </button>
                    </NavLink>
                </div>
            </nav>
        </div>
    );
}

export default Nav;
