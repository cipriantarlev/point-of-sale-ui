import {
    ROOT_CONTEXT_PATH,
    REQUEST_USERS_PENDING,
    REQUEST_USERS_SUCCESS,
    REQUEST_USERS_FAILED,
    REQUEST_USER_PENDING,
    REQUEST_USER_SUCCESS,
    REQUEST_USER_FAILED,
    REQUEST_ROLES_PENDING,
    REQUEST_ROLES_SUCCESS,
    REQUEST_ROLES_FAILED,
    CREATE_USER_PENDING,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILED,
    UPDATE_USER_PENDING,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    DELETE_USER_PENDING,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILED,
} from '../constants';

import {
    authorizationData,
    dataApi,
    checkStatusCode,
} from '../common/utils';

export const fetchUsers = () => (dispatch) => {
    dispatch({ type: REQUEST_USERS_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/users`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_USERS_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_USERS_FAILED, payload: error }))
}

export const fetchUser = (id) => (dispatch) => {
    dispatch({ type: REQUEST_USER_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/users/${id}`, authorizationData())
        .then(respone => respone.json())
        .then(data => checkStatusCode(data, REQUEST_USER_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_USER_FAILED, payload: error }))
}

export const createUser = (user) => (dispatch) => {
    dispatch({ type: CREATE_USER_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/users`, dataApi('post', user))
        .then(respone => respone.json())
        .then(data => checkStatusCode(data, CREATE_USER_SUCCESS, dispatch))
        .catch(error => dispatch({ type: CREATE_USER_FAILED, payload: error }))
}

export const updateUser = (user) => (dispatch) => {
    dispatch({ type: UPDATE_USER_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/users`, dataApi('put', user))
        .then(respone => respone.json())
        .then(data => checkStatusCode(data, UPDATE_USER_SUCCESS, dispatch))
        .catch(error => dispatch({ type: UPDATE_USER_FAILED, payload: error }))
}

export const deleteUser = (id) => (dispatch) => {
    dispatch({ type: DELETE_USER_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/users/${id}`, dataApi('delete'))
        .then(respone => dispatch({ type: DELETE_USER_SUCCESS, payload: respone.status }))
        .catch(error => dispatch({ type: DELETE_USER_FAILED, payload: error }))
}

export const fetchRoles = () => (dispatch) => {
    dispatch({ type: REQUEST_ROLES_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/roles`, authorizationData())
        .then(respone => respone.json())
        .then(data => checkStatusCode(data, REQUEST_ROLES_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_ROLES_FAILED, payload: error }))
}