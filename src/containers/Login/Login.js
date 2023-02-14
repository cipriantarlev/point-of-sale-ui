import React, { useState } from 'react';
import { connect } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useStyles } from './style';
import './login.css';

import { handleLogin } from '../../actions/authAction';

const mapStateToProps = (state) => {
  return {
    isPeding: state.requestLogin.isPeding,
    response: state.requestLogin.response,
    loginError: state.requestLogin.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleLogin: (username, password) => dispatch(handleLogin(username, password))
  }
}

const Login = (props) => {
  const classes = useStyles();

  const {
    onHandleLogin,
    loginError
  } = props;

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
      onHandleLogin(username, password)
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
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {loginError ? <h4 style={{ color: 'red', marginTop: 15, marginBottom: -5 }}>Incorrect Username or password</h4> : null}
        <form className={classes.form} noValidate>
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
            className={classes.submit}
            onClick={handleSignin}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);