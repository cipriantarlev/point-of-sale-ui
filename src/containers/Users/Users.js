import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
} from '../../slices/userSlice';

import DisplayAlert from '../../common/DisplayAlert';
import ProgressLoading from '../../common/ProgressLoading';

import { DEFAULT_UUID_ID } from '../../constants';

import './style.css';

const useStyles = makeStyles()({
  table: {
    minWidth: 650,
  },
});

const Users = () => {

  const isPending = useSelector((state) => state.userReducer.isPending);
  const users = useSelector((state) => state.userReducer.users);
  const error = useSelector((state) => state.userReducer.error);

  const dispatch = useDispatch();

  const { classes } = useStyles();

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch])

  useEffect(() => {
    setOpen(true)
  }, [error])

  useEffect(() => {
    setOpen(false)
  }, [])

  const onAddNewUser = () => {
    navigate(`/users/${DEFAULT_UUID_ID}`)
  }

  const removeUser = (id) => {
    const answer = window.confirm(`Are you sure you want to delete the user with id: ${id}?`);
    if (answer === true) {
      dispatch(deleteUser(id));
      navigate(0);//TODO think how to avoid it
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
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  <Link className="no-underline" to={`/users/${user.id}`}>
                    {index += 1}
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
      {users.status === 403 ? navigate("/forbidden") :
        <div>
          <Button
            variant="contained"
            className="mb-4"
            color="primary"
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

export default Users;