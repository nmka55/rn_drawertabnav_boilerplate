import {USER_LOGIN, USER_LOGOUT} from '../constants';

export function userLogin(username, password) {
  return dispatch => {
    dispatch({type: USER_LOGIN, userData: {username, password}});
  };
}

export function userLogout() {
  return dispatch => {
    dispatch({type: USER_LOGOUT});
  };
}
