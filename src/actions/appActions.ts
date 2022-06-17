// Add action TYPE constants
import {
    GET_APP_LIST_REQUEST,
    GET_APP_LIST_SUCCESS,
    GET_APP_LIST_FAILURE,
    GET_WEATHER_REQUEST,
    GET_WEATHER_SUCCESS,
    GET_WEATHER_FAILURE,
    GET_LOCATION_BY_SERIAL_REQUEST,
    GET_LOCATION_BY_SERIAL_SUCCESS,
    GET_LOCATION_BY_SERIAL_FAILURE,
    GET_IMG_LIST_REQUEST,
    GET_IMG_LIST_SUCCESS,
    GET_IMG_LIST_FAILURE,
    GET_PROFILE_DATA_SUCCESS,
    GET_PROFILE_DATA_REQUEST,
    GET_PROFILE_DATA_FAILURE,
    GET_EXT_APP_LIST_REQUEST,
    GET_EXT_APP_LIST_SUCCESS,
    GET_EXT_APP_LIST_FAILURE,
    GET_TENANT_PROPS_FAILURE,
    GET_TENANT_PROPS_REQUEST,
    GET_TENANT_PROPS_SUCCESS,
    GET_ADMIN_PROPS_REQUEST,
    GET_ADMIN_PROPS_SUCCESS,
    GET_ADMIN_PROPS_FAILURE,
    GET_THEME_PROPERTIES_REQUEST,
    GET_THEME_PROPERTIES_SUCCESS,
    GET_THEME_PROPERTIES_FAILURE,
    SET_APPLICATION_FONT_SIZE_PREFERENCE,
} from './appActionTypes';
import {
    GetAppListRequest,
    GetAppListSuccess,
    GetAppListSuccessPayload,
    GetAppListFailure,
    GetAppListFailurePayload,
    GetWeatherRequest,
    GetWeatherSuccess,
    GetWeatherSuccessPayload,
    GetWeatherFailure,
    GetWeatherFailurePayload,
    GetLocationBySerialNumberRequest,
    GetLocationBySerialNumberSuccess,
    GetLocationBySerialNoSuccessPayload,
    GetLocationBySerialNumberFailure,
    GetLocationBySerialNumberFailurePayload,
    GetImgListRequest,
    GetImgListSuccess,
    GetImgListSuccessPayload,
    GetImgListFailure,
    GetImgListFailurePayload,
    GetProfileDataRequest,
    GetProfileDataSuccess,
    GetProfileDataSuccessPayload,
    GetProfileDataFailure,
    GetProfileDataFailurePayload,
    GetExtAppsRequest,
    GetExtAppsSuccess,
    GetExtAppsSuccessPayload,
    GetExtAppsFailure,
    GetExtAppsFailurePayload,
    GetTenantPropSuccessPayload,
    GetTenantPropFailurePayload,
    GetTenantPropRequest,
    GetTenantPropSuccess,
    GetTenantPropFailure,
    GetAdminPropSuccessPayload,
    GetAdminPropFailurePayload,
    GetAdminPropRequest,
    GetAdminPropSuccess,
    GetAdminPropFailure,
    GetThemePropertiesRequest,
    GetThemePropertiesSuccess,
    GetThemePropertiesFailure,
    GetThemePropertiesSuccessPayload,
    GetThemePropertiesFailurePayload,
    SetApplicationFontSizePreference,
} from '../types/appTypes';

/**
 * This function triggers the getAppList saga function
 * @return {Object} type
 */
export const getAppListRequest = (room_type: string): GetAppListRequest => ({
    type: GET_APP_LIST_REQUEST,
    room_type: room_type,
});

/**
 * This function store list of app in the root store.
 * @param {GetAppListSuccessPayload} payload
 * @return {Object} type and list of app array
 */
export const getAppListSuccess = (payload: GetAppListSuccessPayload): GetAppListSuccess => ({
    type: GET_APP_LIST_SUCCESS,
    payload,
});

/**
 * This function add error/failure message in the root store.
 * @param {GetAppListFailurePayload} payload
 * @return {Object} type and error message
 */
export const getAppListFailure = (payload: GetAppListFailurePayload): GetAppListFailure => ({
    type: GET_APP_LIST_FAILURE,
    payload,
});

/**
 * This function triggers the getImgList saga function
 * @return {Object} type
 */
export const getImgListRequest = (): GetImgListRequest => ({
    type: GET_IMG_LIST_REQUEST,
});

/**
 * This function store list of images in the root store.
 * @param {GetImgListSuccessPayload} payload
 * @return {Object} type and list of image array
 */
export const getImgListSuccess = (payload: GetImgListSuccessPayload): GetImgListSuccess => ({
    type: GET_IMG_LIST_SUCCESS,
    payload,
});

/**
 * This function add error/failure message in the root store.
 * @param {GetImgListFailurePayload} payload
 * @return {Object} type and error message
 */
export const getImgListFailure = (payload: GetImgListFailurePayload): GetImgListFailure => ({
    type: GET_IMG_LIST_FAILURE,
    payload,
});

/**
 * This function triggers the getProfileData saga function
 * @return {Object} type
 */
export const getProfileRequest = (): GetProfileDataRequest => ({
    type: GET_PROFILE_DATA_REQUEST,
});

/**
 * This function store profile data in the root store.
 * @param {GetProfileDataSuccessPayload} payload
 * @return {Object} type and object of prfile
 */
export const getProfileSuccess = (payload: GetProfileDataSuccessPayload): GetProfileDataSuccess => ({
    type: GET_PROFILE_DATA_SUCCESS,
    payload,
});

/**
 * This function add error/failure message in the root store.
 * @param {GetProfileDataFailurePayload} payload
 * @return {Object} type and error message
 */
export const getProfileFailure = (payload: GetProfileDataFailurePayload): GetProfileDataFailure => ({
    type: GET_PROFILE_DATA_FAILURE,
    payload,
});

/**
 * This function triggers the getWeatherInformation saga function
 * This will initiate the API call for the 'weather' information.
 * @return {Object} type
 */
export const getWeatherRequest = (): GetWeatherRequest => ({
    type: GET_WEATHER_REQUEST,
});

/**
 * This function store weather information into root store, once the weather API return SUCCESS response.
 * @param {GetWeatherSuccessPayload} payload
 * @return {Object} type and weather information.
 */
export const getWeatherSuccess = (payload: GetWeatherSuccessPayload): GetWeatherSuccess => ({
    type: GET_WEATHER_SUCCESS,
    payload,
});

/**
 * This function add error/failure message in the root store, for the failure of weather API response.
 * @param {GetWeatherFailurePayload} payload
 * @return {Object} type and error message
 */
export const getWeatherFailure = (payload: GetWeatherFailurePayload): GetWeatherFailure => ({
    type: GET_WEATHER_FAILURE,
    payload,
});

/**
 * This function triggers the getLocationBySerialNumber saga function
 * This will initiate the API call for the 'location' information.
 * @return {Object} type
 */
export const getLocationBySerialNumberRequest = (): GetLocationBySerialNumberRequest => ({
    type: GET_LOCATION_BY_SERIAL_REQUEST,
});

/**
 * This function store location information into root store, once the location API return SUCCESS response.
 * @param {Object} payload
 * @return {Object} type and weather information.
 */
export const getLocationBySerialNumberSuccess = (
    payload: GetLocationBySerialNoSuccessPayload,
): GetLocationBySerialNumberSuccess => ({
    type: GET_LOCATION_BY_SERIAL_SUCCESS,
    payload,
});

/**
 * This function add error/failure message in the root store, for the failure of location by serial number API response.
 * @param {GetLocationBySerialNumberFailurePayload} payload
 * @return {Object} type and error message
 */
export const getLocationBySerialNumberFailure = (
    payload: GetLocationBySerialNumberFailurePayload,
): GetLocationBySerialNumberFailure => ({
    type: GET_LOCATION_BY_SERIAL_FAILURE,
    payload,
});

/**
 * This function triggers the getExtAppList saga function
 * @return {Object} type
 */
export const getExtAppsRequest = (): GetExtAppsRequest => ({
    type: GET_EXT_APP_LIST_REQUEST,
});

/**
 * This function store external app list in the root store.
 * @param {GetExtAppsSuccessPayload} payload
 * @return {Object} type and object of prfile
 */
export const getExtAppsSuccess = (payload: GetExtAppsSuccessPayload): GetExtAppsSuccess => ({
    type: GET_EXT_APP_LIST_SUCCESS,
    payload,
});

/**
 * This function add error/failure message in the root store.
 * @param {GetExtAppsFailurePayload} payload
 * @return {Object} type and error message
 */
export const getExtAppsFailure = (payload: GetExtAppsFailurePayload): GetExtAppsFailure => ({
    type: GET_EXT_APP_LIST_FAILURE,
    payload,
});

/**
 * This function triggers the getTenantCustomProps saga function
 * @return {Object} type
 */
export const getTenantPropRequest = (): GetTenantPropRequest => ({
    type: GET_TENANT_PROPS_REQUEST,
});

/**
 * This function store tenant specific custimization
 * props in the root store.
 * @param {GetTenantPropSuccessPayload} payload
 * @return {Object} type and object of prfile
 */
export const getTenantPropSuccess = (payload: GetTenantPropSuccessPayload): GetTenantPropSuccess => ({
    type: GET_TENANT_PROPS_SUCCESS,
    payload,
});

/**
 * This function add error/failure message in the root store.
 * @param {GetTenantPropFailurePayload} payload
 * @return {Object} type and error message
 */
export const getTenantPropFailure = (payload: GetTenantPropFailurePayload): GetTenantPropFailure => ({
    type: GET_TENANT_PROPS_FAILURE,
    payload,
});

/**
 * This function triggers the getAdminCustomProps saga function
 * @return {Object} type
 */
export const getAdminPropRequest = (): GetAdminPropRequest => ({
    type: GET_ADMIN_PROPS_REQUEST,
});

/**
 * This function store admin specific
 * props in the root store.
 * @param {GetAdminPropSuccessPayload} payload
 * @return {Object} type and object of prfile
 */
export const getAdminPropSuccess = (payload: GetAdminPropSuccessPayload): GetAdminPropSuccess => ({
    type: GET_ADMIN_PROPS_SUCCESS,
    payload,
});

/**
 * This function add error/failure message in the root store.
 * @param {GetAdminPropFailurePayload} payload
 * @return {Object} type and error message
 */
export const getAdminPropFailure = (payload: GetAdminPropFailurePayload): GetAdminPropFailure => ({
    type: GET_ADMIN_PROPS_FAILURE,
    payload,
});

/**
 * This function triggers the getAdminCustomProps saga function
 * @return {Object} type
 */
export const getThemePropertiesRequest = (): GetThemePropertiesRequest => ({
    type: GET_THEME_PROPERTIES_REQUEST,
});

/**
 * This handle the success response of Theme properties API response.
 * @param {GetThemePropertiesSuccessPayload} payload
 * @return {Object} type and configuration
 */
export const getThemePropertiesSuccess = (payload: GetThemePropertiesSuccessPayload): GetThemePropertiesSuccess => ({
    type: GET_THEME_PROPERTIES_SUCCESS,
    payload,
});

/**
 * This handle the error response of Theme properties API response.
 * @param {GetThemePropertiesFailurePayload} payload
 * @return {Object} type and error message
 */
export const getThemePropertiesFailure = (payload: GetThemePropertiesFailurePayload): GetThemePropertiesFailure => ({
    type: GET_THEME_PROPERTIES_FAILURE,
    payload,
});

/**
 * This function is used when the font size is set using the preference option from 'Settings' module.
 * @param {string} payload
 * @return {Object} type and font size
 */
export const setApplicationFontSizePreference = (payload: string): SetApplicationFontSizePreference => ({
    type: SET_APPLICATION_FONT_SIZE_PREFERENCE,
    payload,
});
