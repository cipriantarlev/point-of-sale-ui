import {
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

const initialStateUsers = {
    isPeding: false,
    users: [],
    error: false,
    user: {},
    roles: [],
    status: ''
}

export const fetchUsers = (state = initialStateUsers, action = {}) => {
    switch (action.type) {
        case REQUEST_USERS_PENDING:
            return Object.assign({}, state, { isPeding: true });
        case REQUEST_USERS_SUCCESS:
            return Object.assign({}, state, { users: action.payload, isPeding: false });
        case REQUEST_USERS_FAILED:
            return Object.assign({}, state, { error: action.payload, isPeding: false });
        case REQUEST_USER_PENDING:
            return Object.assign({}, state, { isPeding: true });
        case REQUEST_USER_SUCCESS:
            return Object.assign({}, state, { user: action.payload, isPeding: false });
        case REQUEST_USER_FAILED:
            return Object.assign({}, state, { error: action.payload, isPeding: false });
        case REQUEST_ROLES_PENDING:
            return Object.assign({}, state, { isPeding: true });
        case REQUEST_ROLES_SUCCESS:
            return Object.assign({}, state, { roles: action.payload, isPeding: false });
        case REQUEST_ROLES_FAILED:
            return Object.assign({}, state, { error: action.payload, isPeding: false });
        case CREATE_USER_PENDING:
            return Object.assign({}, state, { isPeding: true });
        case CREATE_USER_SUCCESS:
            return Object.assign({}, state, { user: action.payload, isPeding: false });
        case CREATE_USER_FAILED:
            return Object.assign({}, state, { error: action.payload, isPeding: false });
        case UPDATE_USER_PENDING:
            return Object.assign({}, state, { isPeding: true });
        case UPDATE_USER_SUCCESS:
            return Object.assign({}, state, { user: action.payload, isPeding: false });
        case UPDATE_USER_FAILED:
            return Object.assign({}, state, { error: action.payload, isPeding: false });
        case DELETE_USER_PENDING:
            return Object.assign({}, state, { isPeding: true });
        case DELETE_USER_SUCCESS:
            return Object.assign({}, state, { status: action.payload, isPeding: false });
        case DELETE_USER_FAILED:
            return Object.assign({}, state, { error: action.payload, isPeding: false });
        default:
            return state;
    }
}