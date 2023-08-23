import { Link, NavLink } from "react-router-dom"
import React from "react"
import "./nav.css"

function Nav() {
    return (
        <nav>
            <h1>
                <Link to="/">Book Swap</Link>
            </h1>
            <h3>
                <NavLink to="/">Available</NavLink>
            </h3>
            <h3>
                <NavLink to="/claimed">Claimed</NavLink>
            </h3>
        </nav>
    )
}

export default Nav
