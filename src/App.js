import React, { useState, useCallback } from 'react';
import {
  Navigate
} from 'react-router-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import Menu from './places/pages/Menu';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
// require database connection 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes = (
    <Routes>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path="/places" exact>
        <Menu />
      </Route>
      <Route path="/places/new" exact>
        <NewPlace />
      </Route>
      <Route path="/auth">
        <Auth />
      </Route>
      <Navigate to="/" />
    </Routes>
  );

  // if (isLoggedIn) {
  //   routes = (
  //     <Routes>
  //       <Route path="/" exact>
  //         <Users />
  //       </Route>
  //       <Route path="/places" exact>
  //         <Menu />
  //       </Route>
  //       <Route path="/places/new" exact>
  //         <NewPlace />
  //       </Route>
  //       <Route path="/places/:placeId">
  //         <UpdatePlace />
  //       </Route>
  //       <Navigate to="/" />
  //     </Routes>
  //   );
  // } else {
  //   routes = (
  //     <Routes>
  //       <Route path="/" exact>
  //         <Users />
  //       </Route>
  //       <Route path="/places" exact>
  //         <Menu />
  //       </Route>
  //       <Route path="/auth">
  //         <Auth />
  //       </Route>
  //       <Navigate to="/auth" />
  //     </Routes>
  //   );
  // }

  return (
    

<BrowserRouter>
<MainNavigation>
{/* We are wrapping our whole app with UserProvider so that */}
{/* our user is accessible through out the app from any page*/}
<UserProvider>
  <Routes>
    <main>{routes}</main>
    {/* <Route exact path="/" element={<Users />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/places" >
    <Menu />
    </Route> */}
    {/* We are protecting our Home Page from unauthenticated */}
    {/* users by wrapping it with PrivateRoute here. */}
  </Routes>
</UserProvider>
</MainNavigation>
</BrowserRouter>


  );
};

export default App;
