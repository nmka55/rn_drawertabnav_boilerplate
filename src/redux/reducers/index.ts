import {combineReducers} from '@reduxjs/toolkit';
import userReducer from '@app/redux/reducers/User';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
