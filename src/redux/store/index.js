import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

export default store = createStore(rootReducer, applyMiddleware(thunk));
