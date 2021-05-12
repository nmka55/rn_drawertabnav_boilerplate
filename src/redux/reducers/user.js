import {USER_LOGIN, USER_LOGOUT} from '../constants';

const initialState = {
  loggedin: false,
  userData: {},
};

const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        loggedin: true,
        userData: {...action.userData},
      };
    case USER_LOGOUT:
      return {
        loggedin: false,
        userData: {},
      };
    default:
      return state;
  }
};

export default userInfo;
