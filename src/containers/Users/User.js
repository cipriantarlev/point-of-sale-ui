import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

import {
  fetchUser,
  fetchRoles,
  createUser,
  updateUser,
  fetchUsers
} from '../../slices/userSlice';

import DisplayAlert from '../../common/DisplayAlert';
import ProgressLoading from '../../common/ProgressLoading';
import InvalidFieldText from '../../common/InvalidFieldText';
import {
  validateInputValue,
  preventSubmitIfInvalidInput
} from '../../common/utils';

import { DEFAULT_UUID_ID } from '../../constants';

const User = () => {

  const dispatch = useDispatch();

  const isPending = useSelector((state) => state.userReducer.isPending);
  const initialUser = useSelector((state) => state.userReducer.user);
  const error = useSelector((state) => state.userReducer.error);
  const roles = useSelector((state) => state.userReducer.roles);

  const USERNAME_HELP_BLOCK = "usernameHelpBlock";
  const PASSWORD_HELP_BLOCK = "passwordHelpBlock";
  const EMAIL_HELP_BLOCK = "emailHelpBlock";

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState({});
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const salt = bcrypt.genSaltSync(10);

  const initializeRolesValue = () => {
    let tempRoles = initialUser.roles !== undefined ? initialUser.roles.map(role => role.id) : [];
    setSelectedRoles(tempRoles);
  }

  useEffect(() => {
    dispatch(fetchRoles())
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRoles())
    if (id !== DEFAULT_UUID_ID) {
      dispatch(fetchUser(id));
    }
  }, [id, dispatch])

  useEffect(() => {
    initializeRolesValue();
    if (id !== DEFAULT_UUID_ID) {
      setUser(initialUser)
    } else {
      setSelectedRoles([]);
    }// eslint-disable-next-line
  }, [initialUser, id])

  useEffect(() => {
    setOpenAlert(true)
  }, [error])

  useEffect(() => {
    setOpenAlert(false)
  }, [setOpenAlert])

  const onClickCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    return answer === true ? navigate("/users") : null;
  }

  const onSelectRole = (event) => {
    setSelectedRoles([].slice.call(event.target.selectedOptions).map(item => item.value));
    setUserRoler();
  }

  const setUserRoler = () => {
    let tempRole = [];
    selectedRoles.forEach(roleId => {
      roles.forEach(role => {
        if (role.id === roleId) {
          tempRole.push(role);
        }
      })
    })
    setUser(Object.assign(user, user, { roles: tempRole }));
  }


  const onChangeUserValues = (event) => {
    switch (event.target.id) {
      case "formGridUsername":
        validateInputValue(setInvalidUsername, "^[a-zA-Z0-9]+$", event);
        setUser({ ...user, username: event.target.value });
        break;
      case "formGridPassword":
        setUser({ ...user, password: event.target.value });
        confirmPassword === event.target.value ? setInvalidPassword(false) : setInvalidPassword(true);
        break;
      case "formGridConfirmPassword":
        setConfirmPassword(event.target.value);
        user.password === event.target.value ? setInvalidPassword(false) : setInvalidPassword(true);
        break;
      case "formGridEmail":
        validateInputValue(setInvalidEmail, "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$", event);
        setUser({ ...user, email: event.target.value });
        break;
      default:
        setUser({ ...user });
        break;
    }
  }

  const isUserReadyToBeSubmitted = () => {
    return user.password && confirmPassword && user.password === confirmPassword
      && invalidUsername === false && invalidEmail === false;
  }

  const onSubmitUser = (event) => {
    if (isUserReadyToBeSubmitted()) {
      const hashPassword = bcrypt.hashSync(user.password, salt);
      setUser(Object.assign(user, user, { password: hashPassword, id: DEFAULT_UUID_ID }));
      setUserRoler();
      if (id !== DEFAULT_UUID_ID) {
        dispatch(updateUser(user));
      } else {
        dispatch(createUser(user));
      }
      dispatch(fetchUsers());
      navigate("/users");
    } else {
      setInvalidPassword(true);
      setConfirmPassword('');
      preventSubmitIfInvalidInput(event);
    }
  }

  const renderUserForm = () => (
    !isPending ?
      <Form onSubmit={onSubmitUser}>
        <Form.Group as={Col} controlId="formGridUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={user.username}
            required={true}
            onChange={onChangeUserValues}
            isInvalid={invalidUsername}
            aria-describedby={USERNAME_HELP_BLOCK}
          />
          <InvalidFieldText
            isInvalid={invalidUsername}
            message={"Username should contain only letters and numbers"}
            ariaDescribedbyId={USERNAME_HELP_BLOCK}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={user.password}
            required={true}
            onChange={onChangeUserValues}
            isInvalid={invalidPassword}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            required={true}
            isInvalid={invalidPassword}
            onChange={onChangeUserValues}
            aria-describedby={PASSWORD_HELP_BLOCK}
          />
          <InvalidFieldText
            isInvalid={invalidPassword}
            message={"Passwords don't match"}
            ariaDescribedbyId={PASSWORD_HELP_BLOCK}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={user.email}
            onChange={onChangeUserValues}
            required={true}
            isInvalid={invalidEmail}
            aria-describedby={EMAIL_HELP_BLOCK}
          />
          <InvalidFieldText
            isInvalid={invalidEmail}
            message={"Email should respect the patter: email@email.com"}
            ariaDescribedbyId={EMAIL_HELP_BLOCK}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridMultipleOptions">
          <Form.Label>Roles</Form.Label>
          <Form.Control
            as="select"
            htmlSize={2}
            multiple
            value={selectedRoles}
            onChange={onSelectRole}
          >
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.role}</option>
            ))}

          </Form.Control>
        </Form.Group>
        <div className="mt3">
          <Button
            className="ml3 w4"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
          <Button
            className="btn btn-warning ml5 w4"
            onClick={onClickCancel}
          >
            Cancel
          </Button>
        </div>
      </Form>
      : <ProgressLoading />
  )

  return (
    <div className="w-40 center mt4">
      {error ?
        <DisplayAlert
          error={error}
          open={openAlert}
          setOpen={setOpenAlert}
        /> : null}
      {(initialUser.status === 403 || roles.status === 403) ? navigate("/forbidden") 
      : renderUserForm()}
    </div>
  );
}

export default User;

