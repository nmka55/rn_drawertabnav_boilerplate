import {userLogin, userLogout} from '@app/redux/actions';

import {createReducer} from '@reduxjs/toolkit';

type InitialStateType = {
  loggedin: boolean;
  userData: {
    [x: string]: any;
  };
};

const initialState: InitialStateType = {
  loggedin: false,
  userData: {},
};

export default createReducer(initialState, builder => {
  builder
    .addCase(userLogin, (state, action) => {
      return {
        ...state,
        loggedin: true,
        userData: {...action.payload},
      };
    })
    .addCase(userLogout, () => {
      return initialState;
    })
    .addDefaultCase(state => {
      return state;
    });
});
