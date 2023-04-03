import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ROOT_CONTEXT_PATH } from '../constants';
import {
    authorizationData,
    dataApi,
    createAsyncRequest,
    createAsyncDeleteRequest,
} from '../common/utils';

const initialState = {
    isPending: false,
    users: [],
    error: null,
    user: {},
    roles: [],
    status: ''
}

export const fetchUsers = createAsyncThunk(
    'user/fetch/users',
    async () => (createAsyncRequest(`${ROOT_CONTEXT_PATH}/users`, authorizationData()))
)

export const fetchUser = createAsyncThunk(
    'user/fetch/user',
    async (id) => (createAsyncRequest(`${ROOT_CONTEXT_PATH}/users/${id}`, authorizationData()))
)

export const createUser = createAsyncThunk(
    'user/create',
    async (user) => (createAsyncRequest(`${ROOT_CONTEXT_PATH}/users`, dataApi('post', user)))
)

export const updateUser = createAsyncThunk(
    'user/updated',
    async (user) => (createAsyncRequest(`${ROOT_CONTEXT_PATH}/users`, dataApi('put', user)))
)

export const deleteUser = createAsyncThunk(
    'user/delete',
    async (id) => (createAsyncDeleteRequest(`${ROOT_CONTEXT_PATH}/users/${id}`, dataApi('delete')))
)

export const fetchRoles = createAsyncThunk(
    'user/fetch/roles',
    async () => (createAsyncRequest(`${ROOT_CONTEXT_PATH}/roles`, authorizationData()))
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isPending = true;
            state.error = null;
        })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.isPending = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message;
                state.isPending = false;
            })
            .addCase(fetchUser.pending, (state, action) => {
                state.isPending = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isPending = false;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.isPending = false;
            })
            .addCase(createUser.pending, (state, action) => {
                state.isPending = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isPending = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.isPending = false;
            })
            .addCase(updateUser.pending, (state, action) => {
                state.isPending = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isPending = false;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.isPending = false;
            })
            .addCase(deleteUser.pending, (state, action) => {
                state.isPending = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = action.payload;
                state.isPending = false;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.isPending = false;
            })
            .addCase(fetchRoles.pending, (state, action) => {
                state.isPending = true;
                state.error = null;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.roles = action.payload;
                state.isPending = false;
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.error = action.error.message;
                state.isPending = false;
            })
    }
})

export default userSlice.reducer;