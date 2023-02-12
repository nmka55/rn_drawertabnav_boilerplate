import {USER_LOGIN, USER_LOGOUT} from '@app/redux/constants';

import {UserDataType} from '@app/screens/home/types';
import {createAction} from '@reduxjs/toolkit';

export const userLogin = createAction<Partial<UserDataType>>(USER_LOGIN);
export const userLogout = createAction(USER_LOGOUT);
