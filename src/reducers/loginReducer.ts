import {
    SET_DEVICE_NUMBER_AND_TENANT_ID,
    SET_USER_IS_AUTHORIZED,
    SET_LOGIN_LOGOUT_BUTTON,
    SET_CONDITION_TO_SHOW_LOGIN_SCREEN,
} from '../actions/loginActionTypes';

import { LoginAction, LoginState } from '../types/loginTypes';

/**
 * This will indicate the initial state of Login.
 */
const initialState: LoginState = {
    userIsAuthorized: false,
    loginLogoutButton: '',
    conditionForLoginScreen: '',
    urlQueryParameters: {
        deviceNumber: '',
        tenantId: '',
    },
};

/**
 * This function maintain and update the state of Login compo of Application
 * @param {Object} state for the first iteration it indicate the initial state, later holds the previous state value.
 * @param {Object} action action object.
 * @returns {Object} updated state value
 */
export default (state = initialState, action: LoginAction) => {
    switch (action.type) {
        case SET_USER_IS_AUTHORIZED:
            return {
                ...state,
                userIsAuthorized: action.payload,
            };
        case SET_DEVICE_NUMBER_AND_TENANT_ID:
            return {
                ...state,
                urlQueryParameters: action.payload,
            };
        case SET_LOGIN_LOGOUT_BUTTON:
            return {
                ...state,
                loginLogoutButton: action.payload,
            };
        case SET_CONDITION_TO_SHOW_LOGIN_SCREEN:
            return {
                ...state,
                conditionForLoginScreen: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};
