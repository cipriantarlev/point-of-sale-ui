import { combineReducers } from 'redux';

// import {
//     requestLogin,
//     requestLogout
// } from './authReducer';

// import { fetchUsers } from './userReducer';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';

export const rootReducer = combineReducers({
    authReducer,
    userReducer
});