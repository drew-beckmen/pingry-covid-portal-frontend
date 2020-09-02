import React from 'react'; 
import { withRouter } from 'react-router-dom'; 

const NavBar = (props) => {

    //login and logout buttons separately 
    let login; 
    let logout; 
    if (!localStorage.token) {
        login = <a className="navbar-nav" href="/login">{props.action}</a>  
    }
    else {
        logout = <button className="btn btn-link" onClick={() => {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            localStorage.removeItem('user_id')
            localStorage.removeItem('write')
            props.history.push("/")
        }}>{props.action}</button>
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="/">
                <img src="https://media.glassdoor.com/sqll/1412465/the-pingry-school-squarelogo-1551257974128.png" width="30" height="30" alt="" />
                Pingry Anywhere
            </a>
            <a className="navbar-nav" href="/people">All People</a>
            <a className="navbar-nav" href="/quarantines">Quarantines</a>
            <a className="navbar-nav" href="/isolations">Isolations</a>
            <a className="navbar-nav" href="/profile">Profile</a>
            { props.action === "Login" && login}
            { props.action === "Logout" && logout }

            <span className="navbar-text">
                Track Pingry's COVID Stats
            </span>
        </nav>
    )
}

export default withRouter(NavBar); 