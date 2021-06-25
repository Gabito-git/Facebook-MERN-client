import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';

import authReducer from "../reducers/authReducer";
import postReducer from "../reducers/postReducer";
import socketReducer from "../reducers/socketReducer";
import uiReducer from "../reducers/uiReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    posts: postReducer,
    socket: socketReducer
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore( rootReducer, composeEnhancers(
    applyMiddleware( thunk )
) )
