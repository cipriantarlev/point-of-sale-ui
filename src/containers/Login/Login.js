import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import './login.css';

import { login } from '../../slices/authSlice';

const Login = () => {

  const loginError = useSelector((state) => state.authReducer.error);

  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [credentialsError, setCredentialsError] = useState(false);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleSignin = () => {
    if (username && password) {
      dispatch(login({ username, password }));
      setCredentialsError(false);
      setPassword('');
      setUsername('');
    } else {
      setCredentialsError(true);
    }
  }

  const onPressEnter = (event) => {
    if (event.charCode === 13) {
      handleSignin();
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {loginError ? <h4 style={{ color: 'red', marginTop: 15, marginBottom: -5 }}>Incorrect Username or password</h4> : null}
        <form sx={{ mt: 1 }} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            error={credentialsError}
            helperText="Field must not be empty"
            onChange={handleUsername}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            error={credentialsError}
            helperText="Field must not be empty"
            onChange={handlePassword}
            onKeyPress={onPressEnter}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignin}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;