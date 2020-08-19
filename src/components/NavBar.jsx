import React from 'react'; 
// import {NavLink} from 'react-router-dom'; 

const NavBar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="/">
                <img src="https://media.glassdoor.com/sqll/1412465/the-pingry-school-squarelogo-1551257974128.png" width="30" height="30" alt="" />
                Pingry Anywhere
            </a>
            <a className="navbar-nav" href="/students">Students</a>
            <a className="navbar-nav" href="/quarantines">Quarantines</a>
            <a className="navbar-nav" href="/isolations">Isolations</a>
            <a className="navbar-nav" href="/login">Login</a>
            <a className="navbar-nav" href="/profile">Profile</a>
            <span className="navbar-text">
                Track Pingry's COVID Stats
            </span>
        </nav>
    )
}

export default NavBar; 