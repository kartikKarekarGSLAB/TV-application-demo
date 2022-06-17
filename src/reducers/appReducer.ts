import {
    GET_APP_LIST_SUCCESS,
    GET_APP_LIST_FAILURE,
    GET_WEATHER_SUCCESS,
    GET_WEATHER_FAILURE,
    GET_LOCATION_BY_SERIAL_SUCCESS,
    GET_LOCATION_BY_SERIAL_FAILURE,
    GET_IMG_LIST_SUCCESS,
    GET_IMG_LIST_FAILURE,
    GET_PROFILE_DATA_SUCCESS,
    GET_PROFILE_DATA_FAILURE,
    GET_EXT_APP_LIST_SUCCESS,
    GET_EXT_APP_LIST_FAILURE,
    GET_TENANT_PROPS_SUCCESS,
    GET_TENANT_PROPS_FAILURE,
    GET_ADMIN_PROPS_SUCCESS,
    GET_ADMIN_PROPS_FAILURE,
    GET_THEME_PROPERTIES_SUCCESS,
    GET_THEME_PROPERTIES_FAILURE,
    SET_APPLICATION_FONT_SIZE_PREFERENCE,
} from '../actions/appActionTypes';

import { AppActions, AppState, APPLICATION_PREFERENCE } from '../types/appTypes';

/**
 * This will indicate the initial state of application.
 */
const initialState: AppState = {
    appList: [],
    weather: {},
    locationResponse: {
        locationDetail: {},
        locationStatus: {},
    },
    imageUrls: {},
    patientProfile: {},
    externalApps: {},
    tenantCustomProp: {},
    adminProps: {},
    themeConfigurations: {},
    applicationPreference: APPLICATION_PREFERENCE,
};

/**
 * This function maintain and update the state of Application
 * @param {Object} state for the first iteration it indicate the initial state, later holds the previous state value.
 * @param {Object} action action object.
 * @returns {Object} updated state value
 */
export default (state = initialState, action: AppActions) => {
    switch (action.type) {
        case GET_APP_LIST_SUCCESS:
            return {
                ...state,
                appList: action.payload.applications,
            };
        case GET_APP_LIST_FAILURE:
            return {
                ...state,
                appList: [],
            };
        case GET_WEATHER_SUCCESS:
            return {
                ...state,
                weather: action.payload.weather,
            };
        case GET_WEATHER_FAILURE:
            return {
                ...state,
                weather: {},
            };
        case GET_LOCATION_BY_SERIAL_SUCCESS:
            return {
                ...state,
                locationResponse: {
                    locationDetail: action.payload.locationDetail,
                    locationStatus: action.payload.locationStatus,
                },
            };
        case GET_LOCATION_BY_SERIAL_FAILURE:
            return {
                ...state,
                locationResponse: {
                    locationDetail: {},
                    locationStatus: action.payload.locationStatus,
                },
            };
        case GET_IMG_LIST_SUCCESS:
            return {
                ...state,
                imageUrls: action.payload.imageUrl,
            };
        case GET_IMG_LIST_FAILURE:
            return {
                ...state,
                imageUrls: [],
            };
        case GET_PROFILE_DATA_SUCCESS:
            return {
                ...state,
                patientProfile: action.payload.profilePayload,
            };
        case GET_PROFILE_DATA_FAILURE:
            return {
                ...state,
                patientProfile: {},
            };
        case GET_EXT_APP_LIST_SUCCESS:
            return {
                ...state,
                externalApps: action.payload.externalApps,
            };
        case GET_EXT_APP_LIST_FAILURE:
            return {
                ...state,
                externalApps: {},
            };
        case GET_TENANT_PROPS_SUCCESS:
            return {
                ...state,
                tenantCustomProp: action.payload.tenantProps,
            };
        case GET_TENANT_PROPS_FAILURE:
            return {
                ...state,
                tenantCustomProp: {},
            };
        case GET_ADMIN_PROPS_SUCCESS:
            return {
                ...state,
                adminProps: action.payload.adminProps,
            };
        case GET_ADMIN_PROPS_FAILURE:
            return {
                ...state,
                adminProps: {},
            };
        case GET_THEME_PROPERTIES_SUCCESS:
            return {
                ...state,
                themeConfigurations: action.payload.themeConfiguration,
            };
        case GET_THEME_PROPERTIES_FAILURE:
            return {
                ...state,
                themeConfigurations: {},
            };
        case SET_APPLICATION_FONT_SIZE_PREFERENCE:
            return {
                ...state,
                applicationPreference: {
                    ...state.applicationPreference,
                    fontSize: action.payload,
                },
            };
        default:
            return {
                ...state,
            };
    }
};
