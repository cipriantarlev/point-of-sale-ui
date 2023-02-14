import React from "react";
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Login from '../Login/Login';
import Home from '../Home/Home';
import Users from '../Users/Users';
import User from '../Users/User';
import NotFound from "../NotFound/NotFound";
import Copyright from '../../common/Copyright';
import Forbidden from '../Forbidden/Forbidden';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.requestLogin.user,
  }
}

const App = ({ loggedIn }) => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" >
          {loggedIn ? <Home /> : <Navigate to="/login" />}
        </Route>
        <Route exact path="/users" >
          {loggedIn ? <Users /> : <Navigate to="/login" />}
        </Route>
        <Route path="/users/:id" >
          {loggedIn ? <User /> : <Navigate to="/login" />}
        </Route>
        <Route path="/login">
          {!loggedIn ? <Login /> : <Navigate to="/" />}
        </Route>
        <Route exact path="/forbidden" >
          {loggedIn ? <Forbidden /> : <Navigate to="/login" />}
        </Route>
        <Route component={NotFound} />
      </Routes>
      {(loggedIn) ? <Box style={{
        position: "fixed",
        bottom: "20px",
        left: 0,
        right: 0
      }}>
        <Copyright />
      </Box> : null}
    </Router>
  )
}

export default connect(mapStateToProps)(App);
