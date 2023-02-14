import {
    REQUEST_LOGIN_PENDING,
    REQUEST_LOGIN_SUCCESS,
    REQUEST_LOGIN_FAILED,
    REQUEST_LOG_OUT,
} from '../constants';
import Cookies from 'js-cookie';

const initialStateLogin = {
    isPeding: false,
    response: {},
    error: false,
    user: Cookies.get('user') ? true : false
}

export const requestLogin = (state = initialStateLogin, action = {}) => {
    switch (action.type) {
        case REQUEST_LOGIN_PENDING:
            return Object.assign({}, state, { isPeding: true });
        case REQUEST_LOGIN_SUCCESS:
            return Object.assign({}, state, { response: action.payload, isPeding: false, user: Cookies.get('user') });
        case REQUEST_LOGIN_FAILED:
            return Object.assign({}, state, { error: action.payload, isPeding: false });
        default:
            return state;
    }
}

const initialStateLogout = {
    user: Cookies.get('user')
}

export const requestLogout = (state = initialStateLogout, action = {}) => {
    switch (action.type) {
        case REQUEST_LOG_OUT:
            return Object.assign({}, state, { user: action.payload });
        default:
            return state;
    }
}