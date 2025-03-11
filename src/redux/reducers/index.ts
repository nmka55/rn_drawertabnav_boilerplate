import {combineReducers} from '@reduxjs/toolkit';
import userReducer from '@redux/reducers/user';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
