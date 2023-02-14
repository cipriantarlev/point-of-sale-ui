import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import {
  fetchUsers,
  deleteUser,
} from '../../actions/userAction';

import DisplayAlert from '../../common/DisplayAlert';
import ProgressLoading from '../../common/ProgressLoading';

import './style.css';

const useStyles = makeStyles()({
  table: {
    minWidth: 650,
  },
});

const mapStateToProps = (state) => {
  return {
    isPending: state.fetchUsers.isPending,
    users: state.fetchUsers.users,
    error: state.fetchUsers.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUsers: () => dispatch(fetchUsers()),
    onDeleteUser: (id) => dispatch(deleteUser(id)),
  }
}

const Users = (props) => {

  const { classes } = useStyles();

  const {
    onFetchUsers,
    isPending,
    users,
    error,
    onDeleteUser,
  } = props;

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onFetchUsers();
  }, [onFetchUsers])

  useEffect(() => {
    setOpen(true)
  }, [error])

  useEffect(() => {
    setOpen(false)
  }, [])

  const onAddNewUser = () => {
    navigate.push("/users/0")
  }

  const removeUser = (id) => {
    const answer = window.confirm(`Are you sure you want to delete the user with id: ${id}?`);
    if (answer === true) {
      onDeleteUser(id);
      navigate.go(0);
    }
  }

  const renderTableContainer = () => {
    return !isPending ?
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{ backgroundColor: "#808080ad" }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Roles</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                <Link className="no-underline" to={`/users/${user.id}`}>
                  {user.id}
                </Link>
              </TableCell>
              <TableCell align="center">
                <Link className="no-underline" to={`/users/${user.id}`}>
                  {user.username}
                </Link>
              </TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">
                {user.roles.reduce((acc, role) => {
                  const result = `${role.role}, ${acc}`
                  return result.replace(/[, ]+$/, "");
                }, '')}
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeUser(user.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    :
    <ProgressLoading />
  }

  return (
    <div style={{ width: 'auto', margin: 100, }}>
      {users.status === 403 ? navigate.push("/forbidden") : 
      <div>
      <Button
        variant="contained"
        className="mb-4"
        style={{ backgroundColor: '#2aa839', color: 'white' }}
        onClick={onAddNewUser}
      >
        Add new User
      </Button>
      <DisplayAlert 
        error={error}
        open={open}
        setOpen={setOpen}
      />
      {renderTableContainer()}
        </div>}
      </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);