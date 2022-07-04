import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import detailsReducer from "../components/details/store/reducer";
import homeReducer from "../components/home/store/reducer";

let reducers = combineReducers({
    home: homeReducer,
    details: detailsReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// const store = createStore(reducers, applyMiddleware(thunkMiddleware, logger));

export default store;
