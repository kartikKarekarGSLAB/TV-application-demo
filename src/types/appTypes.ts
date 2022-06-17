/**
 * This file will contain all the interface, type and there data type
 * which is used or required of APP component and there related operation.
 */

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
} from '../actions/appActionTypes';
import { DEFAULT_FONT_SIZE_CATEGORY } from '../theme/font/constantsUtil';

/**
 * This type is defined for the Application response.
 */
export interface IApp {
    appId: string;
    appName: string;
    appDescription: string;
    appStatusCode: string;
    privacyApplicable: boolean;
    privacyCheck: string;
    sequence: number;
    availableWithoutAuth: boolean;
    hideInGuestMode: boolean;
}

/**
 * This type is used during the SUCCESS state of API response for App List.
 */
export interface GetAppListSuccessPayload {
    applications: IApp[];
}

/**
 * This type is used during the FAILURE state of API response for APP List.
 */
export interface GetAppListFailurePayload {
    error: string;
}

/**
 * This type is used to indicate the App List API call is initiated,
 * usually used such APIs to show the loading state of application.
 */
export interface GetAppListRequest {
    type: typeof GET_APP_LIST_REQUEST;
    room_type: string;
}

/**
 * This type is used to indicate the App List API call is successfully completed.
 */
export type GetAppListSuccess = {
    type: typeof GET_APP_LIST_SUCCESS;
    payload: GetAppListSuccessPayload;
};

/**
 * This type is used to indicate the App List API call resulted into failure.
 */
export type GetAppListFailure = {
    type: typeof GET_APP_LIST_FAILURE;
    payload: GetAppListFailurePayload;
};

/**
 * This type is used during the SUCCESS state of API response for Image List.
 */
export interface GetImgListSuccessPayload {
    imageUrl: any;
}

/**
 * This type is used during the FAILURE state of API response for Image List.
 */
export interface GetImgListFailurePayload {
    error: string;
}
/**
 * This type is used to indicate the Image List API call is initiated,
 * usually used such APIs to show the loading state of application.
 */
export interface GetImgListRequest {
    type: typeof GET_IMG_LIST_REQUEST;
}

/**
 * This type is used to indicate the Imags List API call is successfully completed.
 */
export type GetImgListSuccess = {
    type: typeof GET_IMG_LIST_SUCCESS;
    payload: GetImgListSuccessPayload;
};

/**
 * This type is used to indicate the Image List API call resulted into failure.
 */
export type GetImgListFailure = {
    type: typeof GET_IMG_LIST_FAILURE;
    payload: GetImgListFailurePayload;
};

/**
 * This type is used during the SUCCESS state of API response for Profile Data.
 */
export interface GetProfileDataSuccessPayload {
    profilePayload: any;
}

/**
 * This type is used during the FAILURE state of API response for Profile Data.
 */
export interface GetProfileDataFailurePayload {
    error: string;
}
/**
 * This type is used to indicate the Profile Data API call is initiated,
 * usually used such APIs to show the loading state of application.
 */
export interface GetProfileDataRequest {
    type: typeof GET_PROFILE_DATA_REQUEST;
}

/**
 * This type is used to indicate the Profile Data API call is successfully completed.
 */
export type GetProfileDataSuccess = {
    type: typeof GET_PROFILE_DATA_SUCCESS;
    payload: GetProfileDataSuccessPayload;
};

/**
 * This type is used to indicate the Profile Data API call resulted into failure.
 */
export type GetProfileDataFailure = {
    type: typeof GET_PROFILE_DATA_FAILURE;
    payload: GetProfileDataFailurePayload;
};

/**
 * This type is used in the Weather response.
 * The condition is the internal structure added for the weather response.
 */
export interface Conditions {
    id: string;
    hashKey: string;
    name: string;
    description: string;
    imageName: string;
    vendorImageUrl: string;
    vendorImageName: string;
}

/**
 * This type is used in the Weather response.
 * The Geo is the internal structure added for the weather response.
 */
export interface Geo {
    zip: string;
    city: string;
    region: string;
    country: string;
    latitude: number;
    longitude: number;
}

/**
 * This type is ued in the Weather API response.
 */
export interface Weather {
    geo: Geo;
    conditions: Conditions[];
    sunrise: number;
    sunset: number;
    temp: number;
    tempUnit: string;
    humidity: number;
    pressure: number;
    tempMin: number;
    tempMax: number;
    windSpeed: number;
    windDeg: number;
    cloudsAll: number;
    publishDate: number;
}

/**
 * This type is used in the Success payload of weather API.
 */
export interface GetWeatherSuccessPayload {
    weather: Weather;
}

/**
 * This type is used to handled the Failure payload of weather API.
 */
export interface GetWeatherFailurePayload {
    error: string;
}

/**
 * This type is used to handled the weather API is initiated.
 */
export interface GetWeatherRequest {
    type: typeof GET_WEATHER_REQUEST;
}

/**
 * This type is used in SUCCESS of wether API response.
 */
export type GetWeatherSuccess = {
    type: typeof GET_WEATHER_SUCCESS;
    payload: GetWeatherSuccessPayload;
};

/**
 * This type is used in FAILURE of wether API response.
 */
export type GetWeatherFailure = {
    type: typeof GET_WEATHER_FAILURE;
    payload: GetWeatherFailurePayload;
};

export interface StatusApplicationData {
    id: string;
    status: boolean;
    privacy: boolean;
}

export interface Department {
    departmentName: string;
    departmentId: string;
}

export interface Device {
    type: string;
    serialNumber: string;
    operationMode: string;
}

export interface Policy {
    callMgrHost: string;
    sipPassword: string;
    sipPhoneNumber: string;
    sipUser: string;
}

export interface Preferences {
    language: string;
    closedCaption: string;
    showClosedCaption: boolean;
    fontSize: string;
    createdDate: number;
    updatedDate: number;
    logLevel: string;
    liveTvProtocolsMediaPlayer: string;
    liveTvProtocolsMobile: string;
    liveTvProtocolsMobileIOS: string;
    liveTvProtocolsMobileAndroid: string;
    autoAnswerAsAudio: boolean;
    autoAnswerAsVideo: boolean;
    autoAnswerExpiryDuration: number;
}

export interface OutboundQueue {
    exchange: string;
    name: string;
    type: string;
}

export interface LocationDetails {
    department: Department;
    facility: string;
    building: string;
    floor: string;
    room: string;
    storeDiscrepancy: boolean;
    bed: string;
    facilityDescription: string;
    buildingDescription: string;
    floorDescription: string;
    roomDescription: string;
    bedDescription: string;
    device: Device;
    policy: Policy;
    preferences: Preferences;
    locationType: string;
    locationId: string;
    devices: Device[];
    outboundQueues: OutboundQueue[];
    displayName: string;
    rbLocation: string;
    rtlsLocation: string;
}
/**
 * This interface is used to decleare the
 * type of status object of API response
 */
export interface ApiStatus {
    statusCode: number;
    errorKey: string;
    errorMessage: string;
}
/**
 * This type is used in the Success payload of get location by serial number API.
 */
export interface GetLocationBySerialNoSuccessPayload {
    locationDetail: LocationDetails;
    locationStatus: ApiStatus;
}

/**
 * This type is used to handled the Failure payload of location by serial number API.
 */
export interface GetLocationBySerialNumberFailurePayload {
    locationStatus: ApiStatus;
}

/**
 * This type is used to handled the get location by serial number API is initiated.
 */
export interface GetLocationBySerialNumberRequest {
    type: typeof GET_LOCATION_BY_SERIAL_REQUEST;
}

/**
 * This type is used in SUCCESS of location by serial number API response.
 */
export type GetLocationBySerialNumberSuccess = {
    type: typeof GET_LOCATION_BY_SERIAL_SUCCESS;
    payload: GetLocationBySerialNoSuccessPayload;
};

/**
 * This type is used in FAILURE of location by serial number API response.
 */
export type GetLocationBySerialNumberFailure = {
    type: typeof GET_LOCATION_BY_SERIAL_FAILURE;
    payload: GetLocationBySerialNumberFailurePayload;
};

/**
 * This type is used during the SUCCESS state of API response for Ext App List.
 */
export interface GetExtAppsSuccessPayload {
    externalApps: any;
}

/**
 * This type is used during the FAILURE state of API response for Ext App List.
 */
export interface GetExtAppsFailurePayload {
    error: string;
}
/**
 * This type is used to indicate the Ext app List API call is initiated,
 * usually used such APIs to show the loading state of application.
 */
export interface GetExtAppsRequest {
    type: typeof GET_EXT_APP_LIST_REQUEST;
}

/**
 * This type is used to indicate the Ext app List API call is successfully completed.
 */
export type GetExtAppsSuccess = {
    type: typeof GET_EXT_APP_LIST_SUCCESS;
    payload: GetExtAppsSuccessPayload;
};

/**
 * This type is used to indicate the Ext app List API call resulted into failure.
 */
export type GetExtAppsFailure = {
    type: typeof GET_EXT_APP_LIST_FAILURE;
    payload: GetExtAppsFailurePayload;
};

/**
 * This type is used during the SUCCESS state of API response for
 * tenant specific custimization props.
 */
export interface GetTenantPropSuccessPayload {
    tenantProps: any;
}

/**
 * This type is used during the FAILURE state of API response for
 * tenant specific custimization props.
 */
export interface GetTenantPropFailurePayload {
    error: string;
}
/**
 * This type is used to indicate the tenant specific customization
 * props API call is initiated,
 * usually used such APIs to show the loading state of application.
 */
export interface GetTenantPropRequest {
    type: typeof GET_TENANT_PROPS_REQUEST;
}

/**
 * This type is used to indicate the tenant specific customization props
 * API call is successfully completed.
 */
export type GetTenantPropSuccess = {
    type: typeof GET_TENANT_PROPS_SUCCESS;
    payload: GetTenantPropSuccessPayload;
};

/**
 * This type is used to indicate the tenant specific
 * custimization props API call resulted into failure.
 */
export type GetTenantPropFailure = {
    type: typeof GET_TENANT_PROPS_FAILURE;
    payload: GetTenantPropFailurePayload;
};

/**
 * This type is used during the SUCCESS state of API response for
 * admin specific props.
 */
export interface GetAdminPropSuccessPayload {
    adminProps: any;
}

/**
 * This type is used during the FAILURE state of API response for
 * admin specific props.
 */
export interface GetAdminPropFailurePayload {
    error: string;
}
/**
 * This type is used to indicate the admin specific props
 * props API call is initiated,
 * usually used such APIs to show the loading state of application.
 */
export interface GetAdminPropRequest {
    type: typeof GET_ADMIN_PROPS_REQUEST;
}

/**
 * This type is used to indicate the admin specific props.
 * API call is successfully completed.
 */
export type GetAdminPropSuccess = {
    type: typeof GET_ADMIN_PROPS_SUCCESS;
    payload: GetAdminPropSuccessPayload;
};

/**
 * This type is used to indicate the admin specific props
 * API call resulted into failure.
 */
export type GetAdminPropFailure = {
    type: typeof GET_ADMIN_PROPS_FAILURE;
    payload: GetAdminPropFailurePayload;
};

/**
 * Type added for the theme configurations.
 */
export type ThemeConfiguration = {
    [key: string]: string;
    'ui-background': string;
    'ui-01': string;
    'ui-03': string;
    'selected-ui': string;
    'selected-ui-background': string;
};

/**
 * This type is used during the SUCCESS state of API response for
 * theme properties.
 */
export interface GetThemePropertiesSuccessPayload {
    themeConfiguration: ThemeConfiguration;
}

/**
 * This type is used during the FAILURE state of API response for
 * theme properties.
 */
export interface GetThemePropertiesFailurePayload {
    error: string;
}

/**
 * This is for initiating the theme related response.
 */
export interface GetThemePropertiesRequest {
    type: typeof GET_THEME_PROPERTIES_REQUEST;
}

/**
 * This is for initiating the theme related properties.
 * API call is successfully completed.
 */
export type GetThemePropertiesSuccess = {
    type: typeof GET_THEME_PROPERTIES_SUCCESS;
    payload: GetThemePropertiesSuccessPayload;
};

/**
 * This is for initiating the theme related properties.
 * API call is successfully completed.
 */
export type GetThemePropertiesFailure = {
    type: typeof GET_THEME_PROPERTIES_FAILURE;
    payload: GetThemePropertiesFailurePayload;
};

/**
 * Type added for the TV Application Preferences.
 */
export type ApplicationPreference = {
    fontSize: string;
};

/**
 * TV Application Preferences default value.
 */
export const APPLICATION_PREFERENCE = {
    fontSize: DEFAULT_FONT_SIZE_CATEGORY,
};
/**
 * This is for initiating the theme related properties.
 * API call is successfully completed.
 */
export type SetApplicationFontSizePreference = {
    type: typeof SET_APPLICATION_FONT_SIZE_PREFERENCE;
    payload: string;
};

/**
 * This indicate the Application state.
 */
export interface AppState {
    appList: IApp[];
    weather: Weather | any;
    locationResponse: {
        locationDetail: LocationDetails | any;
        locationStatus: ApiStatus | any;
    };
    imageUrls: any;
    patientProfile: any;
    externalApps: any;
    tenantCustomProp: any;
    adminProps: any;
    themeConfigurations: ThemeConfiguration | any;
    applicationPreference: ApplicationPreference | any;
}

export type AppActions =
    | GetAppListRequest
    | GetAppListSuccess
    | GetAppListFailure
    | GetWeatherRequest
    | GetWeatherSuccess
    | GetWeatherFailure
    | GetLocationBySerialNumberRequest
    | GetLocationBySerialNumberSuccess
    | GetLocationBySerialNumberFailure
    | GetImgListRequest
    | GetImgListSuccess
    | GetImgListFailure
    | GetProfileDataRequest
    | GetProfileDataSuccess
    | GetProfileDataFailure
    | GetExtAppsRequest
    | GetExtAppsSuccess
    | GetExtAppsFailure
    | GetTenantPropRequest
    | GetTenantPropSuccess
    | GetTenantPropFailure
    | GetAdminPropRequest
    | GetAdminPropSuccess
    | GetAdminPropFailure
    | GetThemePropertiesRequest
    | GetThemePropertiesSuccess
    | GetThemePropertiesFailure
    | SetApplicationFontSizePreference;
