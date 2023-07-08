import { legacy_createStore,compose,applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/reducer";


const composer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers=combineReducers({
    auth:authReducer
});

const store=legacy_createStore(rootReducers,composer(applyMiddleware(thunk)))
export {store}