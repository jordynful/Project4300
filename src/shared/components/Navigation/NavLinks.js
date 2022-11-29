import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import './NavLinks.css';

function NavLinks() {
  const [username, setUsername] = useState(null)

  async function logout() {
    localStorage.removeItem("token")
    Redirect("auth-routes/login")
  }
  useEffect(() => {
    fetch("auth-routes/isUserAuth", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => data.isLoggedIn ? setUsername(data.username): null)
  }, [])

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/places" exact> Menu</NavLink>
      </li>
        <li>
          <NavLink  className = "navvy"to="/" exact>About Us</NavLink>
        </li>
      
      {!username && (
        <li>
          <NavLink  className = "navvy"to="/auth/login">Log In</NavLink>
        </li>
      )}
      {username && (
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      )}
        {username && (
        <li>
          <NavLink to='/places/new'>Add to Menu</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
