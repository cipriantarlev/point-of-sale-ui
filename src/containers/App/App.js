import React from "react";
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from "@mui/material";
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

const theme = createTheme({
  palette: {
    secondary: {
      main: '#b2102f',
      light: '#ff1744',
      dark: '#ff4569'
    }
  }
});

const App = () => {
  const loggedIn = useSelector((state) => state.authReducer.user);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route exact path="/users" element={loggedIn ? <Users /> : <Navigate to="/login" />} />
          <Route path="/users/:id" element={loggedIn ? <User /> : <Navigate to="/login" />} />
          <Route path="/login" element={!loggedIn ? <Login /> : <Navigate to="/" />} />
          <Route exact path="/forbidden" element={loggedIn ? <Forbidden /> : <Navigate to="/" />} />
          <Route path='*' exact={true} element={<NotFound />} />
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
    </ThemeProvider>
  )
}

export default App;
