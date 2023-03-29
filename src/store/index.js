import logger from 'redux-logger'
import { rootReducer } from '../reducers/index';
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store;