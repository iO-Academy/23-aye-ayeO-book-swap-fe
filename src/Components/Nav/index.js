import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import './nav.css';

function Nav() {
    return (
        <div className='w-full bg-rose-400 sm:fixed relative z-40 nav'>
            <nav className='px-4 sm:py-2 pb-2 flex justify-between text-slate-800 w-full max-w-7xl m-auto min-[500px]:flex-row flex-col gap-3'>
                <span className='text-3xl font-semibold py-2 justify-center flex'>
                    <Link to='/'>Swapp</Link>
                </span>
                <div className='flex gap-6 sm:justified-end justify-center transition items-center text-lg'>
                    <NavLink to='/' className='transition-font duration-2000'>
                        Available
                    </NavLink>

                    <NavLink to='/claimed'>Claimed</NavLink>
                    <NavLink
                        to='/books/add'
                        className={
                            'py-3 px-5 rounded-md text-base bg-zinc-100 bg-opacity-40 border-slate-700 hover:text-zinc-100 hover:bg-slate-700 text-slate-800 transition'
                        }
                    >
                        Add&nbsp;Book
                    </NavLink>
                </div>
            </nav>
        </div>
    );
}

export default Nav;
