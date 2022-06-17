/**
 * This file will contain all the interface, type and there data type
 * which is used or required of LogIn component and there related operation.
 */

import {
    SET_DEVICE_NUMBER_AND_TENANT_ID,
    SET_USER_IS_AUTHORIZED,
    SET_LOGIN_LOGOUT_BUTTON,
    SET_CONDITION_TO_SHOW_LOGIN_SCREEN,
} from '../actions/loginActionTypes';

export interface URLQueryParameters {
    deviceNumber: string | any;
    tenantId: string | any;
}
/**
 * This is for seting the URL parameters
 * in redux store.
 */
export type SetDeviceNumberAndTenantId = {
    type: typeof SET_DEVICE_NUMBER_AND_TENANT_ID;
    payload: URLQueryParameters;
};

/**
 * This is for setting the userIsAuthorized
 * flag in redux store.
 */
export type SetUserIsAuthorized = {
    type: typeof SET_USER_IS_AUTHORIZED;
    payload: boolean;
};

/**
 * This is for setting the login or logout
 * button type string in redux store.
 */
export type SetLoginLogoutButton = {
    type: typeof SET_LOGIN_LOGOUT_BUTTON;
    payload: string;
};

/**
 * This is for setting condition in redux store
 * on which we can show the login screen
 */
export type SetConditionForLoginScreen = {
    type: typeof SET_CONDITION_TO_SHOW_LOGIN_SCREEN;
    payload: string;
};
/**
 * This indicate the login state.
 */
export interface LoginState {
    userIsAuthorized: boolean;
    loginLogoutButton: string;
    conditionForLoginScreen: string;
    urlQueryParameters: URLQueryParameters;
}

export type LoginAction =
    | SetDeviceNumberAndTenantId
    | SetUserIsAuthorized
    | SetLoginLogoutButton
    | SetConditionForLoginScreen;
