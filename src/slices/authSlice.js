import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { ROOT_CONTEXT_PATH } from '../constants';

const initialState = {
    isPeding: false,
    response: null,
    error: null,
    user: Cookies.get('user') ? true : false
};

const expireTime = new Date();
expireTime.setHours(expireTime.getHours() + 15);
export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }) => {
        try {
            const response = await fetch(`${ROOT_CONTEXT_PATH}/login`, {
                headers: {
                    'Authorization': `Basic ${window.btoa(username + ':' + password)}`,
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Access-Control-Allow-Origin': ROOT_CONTEXT_PATH,
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PUT, OPTIONS, PATCH, DELETE',
                }
            })
            const data = await response.json();
            Cookies.set('user', `Basic ${window.btoa(username + ':' + password)}`, { expires: expireTime })
            return data;
        } catch (error) {
            throw Error(error);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state, action) {
            Cookies.remove('user')
            state.isPeding = false;
            state.user = null;
            state.response = null;
            state.error = null;
        },
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.isPeding = true;
            state.error = null;
        },
        [login.fulfilled]: (state, action) => {
            state.response = action.payload;
            state.isPeding = false;
            state.user = Cookies.get('user');
        },
        [login.rejected]: (state, action) => {
            state.error = action.error.message;
            state.isPeding = false;
        },
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;