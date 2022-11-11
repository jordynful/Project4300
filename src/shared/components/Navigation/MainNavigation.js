import React from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import './MainNavigation.css';

const MainNavigation = props => {

  return (
    <React.Fragment>
      <MainHeader>
        <h1 className="main-navigation__title">
          <Link to="/">the café on</Link>
        </h1>
        <h1 className="main-navigation__Lumpkin">
          <Link to="/">Lumpkin</Link>
        </h1>
        <h3 className = "main-nav-subhead">serving coffee, tea, breakfast, pastries,</h3>
        <h3 className ="main-nav-subhead">sandwiches, soups, salads, and other light fare</h3>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
