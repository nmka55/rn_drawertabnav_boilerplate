import {USER_LOGIN, USER_LOGOUT} from '@app/redux/constants';
import {createAction} from '@reduxjs/toolkit';

export const userLogin = createAction(USER_LOGIN);
export const userLogout = createAction(USER_LOGOUT);
