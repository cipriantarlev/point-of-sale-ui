import { combineReducers } from 'redux';

import {
    requestLogin,
    requestLogout
} from './authReducer';

import { fetchUsers } from './userReducer';

export const rootReducer = combineReducers({
    requestLogin,
    requestLogout,
    fetchUsers,
});