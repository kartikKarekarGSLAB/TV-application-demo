import * as commonConst from '../utils/commonConst';

export const config = {
    O_AUTH: {
        O_AUTH_ENABLE: true,
        O_AUTH_TOKEN_TYPE: 'Bearer ',
    },
    URL: {
        BASE_VERSION: function () {
            return config.O_AUTH.O_AUTH_ENABLE ? commonConst.V2 : commonConst.V1;
        },
        MES_BASE_PATH: function () {
            return config.URL.BASE_VERSION() + commonConst.MES;
        },
        CONTENT_BASE_PATH: function () {
            return config.URL.BASE_VERSION() + commonConst.CONTENT;
        },
        APP_CONFIG: function (locationType: string) {
            return `/apps/config?locationType=${locationType}`;
        },
        WEATHER: function () {
            return `${commonConst.LOCATIONS}/weather`;
        },
        LOCATION_BY_SERIAL_NUMBER: function (serialNumber: string) {
            return `${commonConst.LOCATIONS}/devices/${serialNumber}`;
        },
        IMAGES_BY_LOCALE_AGE: function (locale: string, ageCategory: string) {
            return `/images?locale=${locale}&ageCategory=${ageCategory}`;
        },
        PROFILE_BY_SERIAL_NUMBER: function (serialNumber: string) {
            return '/patients/devices' + `/${serialNumber}` + commonConst.PROFILE;
        },
        CONFIGREGISTRY_CONFIGS: function () {
            return commonConst.CONFIGREGISTRY + commonConst.CONFIGS;
        },
        CUSTOM_TENANT_PROP: function () {
            return commonConst.APPS + commonConst.CUSTOMIZE;
        },
        CONFIGREGISTRY_CONFIGLIST: function () {
            return commonConst.CONFIGREGISTRY + commonConst.CONFIGLIST;
        },
        VIDEO_APP: function () {
            return commonConst.CONTENT + commonConst.CONTENT + commonConst.VIDEOS;
        },
        THEME_CONFIGURATIONS: function (locale: string, ageCategory: string) {
            return `/themes?locale=${locale}&ageCategory=${ageCategory}`;
        },
        LOGIN_FIELDS: function () {
            return `${commonConst.LOCATIONS}/format`;
        },
        LOCATIONS_BY_TOKEN: function () {
            return `${commonConst.LOCATIONS}/by/token`;
        },
        USER_AUTHORIZATION: function (locationId: string) {
            return config.URL.MES_BASE_PATH() + `/${commonConst.ROOMS}` + `/${locationId}` + `/${commonConst.PASSWORD}`;
        },
    },
};
