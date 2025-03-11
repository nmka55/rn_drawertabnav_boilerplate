import {createAction} from '@reduxjs/toolkit';
import {UserDataType} from '@app/screens/Home/types';

export const userLogin = createAction<Partial<UserDataType>>('user/login');
export const userLogout = createAction('user/logout');
