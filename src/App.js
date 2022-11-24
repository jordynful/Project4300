import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
 
} from 'react-router-dom';

import Home from './places/pages/Home';
import NewPlace from './places/pages/NewPlace';
import Menu from './places/pages/Menu';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/places" exact>
          <Menu />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/vert/:placeId">
          <UpdatePlace />
        </Route>
        <Navigate to="/" />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/places" exact>
          <Menu />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Navigate to="/auth" />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
      <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;