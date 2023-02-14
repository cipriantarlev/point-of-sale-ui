import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from '../reducers/index';

const logger = createLogger();

export default function configureStore() {
    return createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));
}