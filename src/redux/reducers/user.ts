import {createReducer} from '@reduxjs/toolkit';
import {userLogin, userLogout} from '@app/redux/actions';
import {UserDataType} from '@app/screens/Home/types';

type InitialStateType = {
  loggedin: boolean;
  userData?: Partial<UserDataType>;
};

const initialState: InitialStateType = {
  loggedin: false,
  userData: undefined,
};

const userReducer = createReducer(initialState, builder => {
  builder
    .addCase(userLogin, (state, action) => {
      state.loggedin = true;
      state.userData = {...action.payload};
    })
    .addCase(userLogout, () => initialState);
});

export default userReducer;
