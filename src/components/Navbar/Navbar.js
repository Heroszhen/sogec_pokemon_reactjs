import React from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = (props) => {
    return (
        // <nav id="navbar">
        //     <Link to="/">Accueil</Link>
        //     <Link to="/test/2">Test</Link>
        // </nav>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Pokémon</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='/'>Accueil</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='/test/3'>Test</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;