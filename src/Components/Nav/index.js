import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import './nav.css';

function Nav() {
    return (
        <nav>
            <h1>
                <Link to='/'>Book Swap</Link>
            </h1>
            <div className='links'>
                <NavLink to='/'>Available</NavLink>

                <NavLink to='/claimed'>Claimed</NavLink>
                <NavLink to='/books/add'>Add Book</NavLink>
            </div>
        </nav>
    );
}

export default Nav;
