import {UserDataType} from '@app/screens/home/types';
import {createAction} from '@reduxjs/toolkit';

export const userLogin = createAction<Partial<UserDataType>>('user/login');
export const userLogout = createAction('user/logout');
