//action TYPE constants related to login flow

import {
    SET_DEVICE_NUMBER_AND_TENANT_ID,
    SET_USER_IS_AUTHORIZED,
    SET_LOGIN_LOGOUT_BUTTON,
    SET_CONDITION_TO_SHOW_LOGIN_SCREEN,
} from './loginActionTypes';

import {
    URLQueryParameters,
    SetDeviceNumberAndTenantId,
    SetUserIsAuthorized,
    SetLoginLogoutButton,
    SetConditionForLoginScreen,
} from '../types/loginTypes';

/**
 * This function is used to set the URL parameter in store.
 * @param {URLQueryParameters} payload
 * @return {Object} type and payload
 */
export const setDeviceNumberAndTenantId = (payload: URLQueryParameters): SetDeviceNumberAndTenantId => ({
    type: SET_DEVICE_NUMBER_AND_TENANT_ID,
    payload,
});

/**
 * This function is used to set the userIsAuthorized flag in store.
 * @param {boolean} payload
 * @return {Object} type and payload
 */
export const setUserIsAuthorized = (payload: boolean): SetUserIsAuthorized => ({
    type: SET_USER_IS_AUTHORIZED,
    payload,
});

/**
 * This function is used to set the login or logout
 * button type in store.
 * @param {string} payload type of button
 * @return {Object} type and payload
 */
export const setLoginLogoutButtonType = (payload: string): SetLoginLogoutButton => ({
    type: SET_LOGIN_LOGOUT_BUTTON,
    payload,
});

/**
 * This function is used to set the condition in store
 * which is responsiable to show login screen
 * @param {string} payload is login screen condition
 * @return {Object} type and payload
 */
export const setConditionForLoginScreen = (payload: string): SetConditionForLoginScreen => ({
    type: SET_CONDITION_TO_SHOW_LOGIN_SCREEN,
    payload,
});
