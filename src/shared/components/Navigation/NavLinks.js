import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/places" exact> Menu</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink  className = "navvy"to="/" exact>About Us</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink  className = "navvy"to="/auth">Log In</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>Log Out</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
