import { combineReducers } from 'redux';

// import {
//     requestLogin,
//     requestLogout
// } from './authReducer';

// import { fetchUsers } from './userReducer';
import authReducer from '../slices/authSlice';

export const rootReducer = combineReducers({
    authReducer
});