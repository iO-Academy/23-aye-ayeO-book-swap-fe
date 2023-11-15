import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import './nav.css';

function Nav() {
    return (
        <div className='w-full bg-rose-400 fixed'>
            <nav className='p-4 py-2  flex justify-between text-slate-800 w-full max-w-7xl m-auto'>
                <span className='text-3xl font-semibold py-2'>
                    <Link to='/'>Swapp</Link>
                </span>
                <div className='flex w-2/4 gap-4 justify-end transition items-center text-lg'>
                    <NavLink to='/' className='transition-font duration-2000'>
                        Available
                    </NavLink>

                    <NavLink to='/claimed'>Claimed</NavLink>
                    <NavLink
                        to='/books/add'
                        className={
                            'rounded-md py-2 px-4 bg-zinc-100 bg-opacity-10 text-base border hover:text-rose-400 hover:bg-zinc-100 text-slate-100 border-opacity-5 transition hover:scale-110'
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
