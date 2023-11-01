import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import './nav.css';

function Nav() {
    return (
        <nav className='p-4 py-2 bg-rose-400 flex justify-between text-slate-800'>
            <h1 className='text-3xl font-semibold py-2'>
                <Link to='/'>Swapper</Link>
            </h1>
            <div className='flex w-2/4 gap-4 justify-end transition items-center text-lg'>
                <NavLink to='/' className='transition-font duration-2000'>
                    Available
                </NavLink>

                <NavLink to='/claimed'>Claimed</NavLink>
                <NavLink
                    to='/books/add'
                    className={
                        'rounded-md py-2 px-4 bg-slate-100 bg-opacity-10 text-base border hover:text-rose-400 hover:bg-slate-100 text-slate-100 border-opacity-5 transition hover:scale-110'
                    }
                >
                    Add Book
                </NavLink>
            </div>
        </nav>
    );
}

export default Nav;
