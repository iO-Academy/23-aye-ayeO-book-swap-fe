import { NavLink } from 'react-router-dom';
import React from 'react';
import './nav.css';

function Nav() {
    return (
        <nav>
            <h1>
                <NavLink to='/'>Book Swap</NavLink>
            </h1>
        </nav>
    );
}

export default Nav;
