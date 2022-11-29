import React, { useState, useCallback, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
 
} from 'react-router-dom';

import Home from './places/pages/Home';
import NewPlace from './places/pages/NewPlace';
import Menu from './places/pages/Menu';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const[username, setUsername] = useState(null);

  useEffect(() => {
    fetch("/auth-routes/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }).then(res => res.json())
    .then(data => data.isLoggedIn ? setUsername(data.username) : null)
  })

  let routes;

  if (username) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/places" exact>
          <Menu />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/places" exact>
          <Menu />
        </Route>
        <Route path="/auth" >
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    
      <Router>
      <MainNavigation />
        <main>{routes}</main>
      </Router>
  );
};

export default App;
