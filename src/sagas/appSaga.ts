import { call, put, StrictEffect, takeLatest } from 'redux-saga/effects';
import {
    getAppListFailure,
    getAppListSuccess,
    getWeatherSuccess,
    getWeatherFailure,
    getLocationBySerialNumberSuccess,
    getLocationBySerialNumberFailure,
    getImgListSuccess,
    getImgListFailure,
    getProfileSuccess,
    getProfileFailure,
    getExtAppsSuccess,
    getExtAppsFailure,
    getTenantPropSuccess,
    getTenantPropFailure,
    getAdminPropSuccess,
    getAdminPropFailure,
    getThemePropertiesSuccess,
    getThemePropertiesFailure,
} from '../actions/appActions';
import {
    GET_APP_LIST_REQUEST,
    GET_LOCATION_BY_SERIAL_REQUEST,
    GET_WEATHER_REQUEST,
    GET_IMG_LIST_REQUEST,
    GET_PROFILE_DATA_REQUEST,
    GET_EXT_APP_LIST_REQUEST,
    GET_TENANT_PROPS_REQUEST,
    GET_ADMIN_PROPS_REQUEST,
    GET_THEME_PROPERTIES_REQUEST,
} from '../actions/appActionTypes';
import { config } from '../config/config';
import { appConfigTV } from '../config/appConfigTV';
import * as commonConst from '../utils/commonConst';
import { ThemeConfiguration } from '../types/appTypes';
import { applyThemeConfigurations } from '../utils/themeUtil';
import { axiosInstance } from '../utils/axiosUtil';
import { getSerialNumber, getPatientPreferLanguage, getPatientAgeCategory } from '../common/applicationUtil';

/**
 * Worker Saga: Fired on GET_APP_LIST_REQUEST action
 * It will call get API for app list and store the fetch
 * response in redux
 */
export function* getAppList(action: any): Generator<StrictEffect> {
    try {
        const response: any = yield call(
            axiosInstance.get,
            config.URL.MES_BASE_PATH() + config.URL.APP_CONFIG(action.room_type),
        );
        const { data } = response;
        yield put(
            getAppListSuccess({
                applications: (data.payload && data.payload.apps) || [],
            }),
        );
    } catch (e: any) {
        yield put(
            getAppListFailure({
                error: e.message,
            }),
        );
    }
}

/**
 * Starts worker saga on latest dispatched `GET_APP_LIST_REQUEST` action.
 * Allows concurrent increments.
 */
export function* watchGetAppList(): Generator<StrictEffect> {
    yield takeLatest(GET_APP_LIST_REQUEST, getAppList);
}

/**
 * Worker Saga: Fired on GET_IMG_LIST_REQUEST action
 * It will call get API for image list and store the fetch
 * response in redux
 */
export function* getImgList(): Generator<StrictEffect> {
    try {
        const response: any = yield call(
            axiosInstance.get,
            config.URL.CONTENT_BASE_PATH() +
                config.URL.IMAGES_BY_LOCALE_AGE(getPatientPreferLanguage(), getPatientAgeCategory()),
        );
        const { data } = response;
        const imagesObj: any = {};
        let imageTagsList = [];
        if (data.payloadList && data.payloadList.length > 0) {
            const payloadList = data.payloadList;
            for (let imageIndex = 0; imageIndex < payloadList.length; imageIndex++) {
                imageTagsList = payloadList[imageIndex].subjectTags ? payloadList[imageIndex].subjectTags : [];
                if (imageTagsList.length > 0) {
                    for (let tagIndex = 0; tagIndex < imageTagsList.length; tagIndex++) {
                        if (
                            imageTagsList[tagIndex].search('tvapp') >= 0 ||
                            imageTagsList[tagIndex].search('pmemobile') >= 0 ||
                            imageTagsList[tagIndex].search('patientapp') >= 0
                        ) {
                            imagesObj[imageTagsList[tagIndex]] = payloadList[imageIndex].httpUri;
                        }
                    }
                }
            }
        }
        yield put(
            getImgListSuccess({
                imageUrl: imagesObj,
            }),
        );
    } catch (e: any) {
        yield put(
            getImgListFailure({
                error: e.message,
            }),
        );
    }
}

/**
 * Starts worker saga on latest dispatched `GET_IMG_LIST_REQUEST` action.
 * Allows concurrent increments.
 */
export function* watchGetImgList(): Generator<StrictEffect> {
    yield takeLatest(GET_IMG_LIST_REQUEST, getImgList);
}

/**
 * Worker Saga: Fired on GET_WEATHER_REQUEST action
 * It will call get API for weather information and store the fetch
 * response in redux
 */
export function* getWeatherInformation(): Generator<StrictEffect> {
    try {
        const response: any = yield call(axiosInstance.get, config.URL.MES_BASE_PATH() + config.URL.WEATHER());
        const { data } = response;
        yield put(
            getWeatherSuccess({
                weather: (data.payload && data.payload) || {},
            }),
        );
    } catch (e: any) {
        yield put(
            getWeatherFailure({
                error: e.message,
            }),
        );
    }
}

/**
 * Starts worker saga on latest dispatched `GET_WEATHER_REQUEST` action.
 * Allows concurrent increments.
 */
export function* watchWeatherInformation(): Generator<StrictEffect> {
    yield takeLatest(GET_WEATHER_REQUEST, getWeatherInformation);
}

/**
 * Worker Saga: Fired on GET_LOCATION_BY_SERIAL_REQUEST action
 * It will call get API for location details and store the fetch
 * response in redux
 */
export function* getLocationBySerialNumber(): Generator<StrictEffect> {
    const serialNum = getSerialNumber();
    if (serialNum && serialNum != '') {
        try {
            const response: any = yield call(
                axiosInstance.get,
                config.URL.MES_BASE_PATH() + config.URL.LOCATION_BY_SERIAL_NUMBER(serialNum),
            );
            const { data } = response;
            if (data && data.payload && data.status) {
                const location_data = Object.assign({}, appConfigTV.locationDetailsPayload, data.payload);
                yield put(
                    getLocationBySerialNumberSuccess({
                        locationDetail: location_data,
                        locationStatus: data.status,
                    }),
                );
            }
        } catch (error: any) {
            const errorResp = error.response;
            if (errorResp && errorResp.data && errorResp.data.status) {
                yield put(
                    getLocationBySerialNumberFailure({
                        locationStatus: errorResp.data.status,
                    }),
                );
            } else {
                console.log('appSaga.ts :: getLocationBySerialNumber error response ::', errorResp);
            }
        }
    } else {
        console.info('appSaga.ts :: Serial number is not available. Skipping location API data request ::', serialNum);
    }
}

/**
 * Starts worker saga on latest dispatched `GET_LOCATION_BY_SERIAL_REQUEST` action.
 * Allows concurrent increments.
 */
export function* watchGetLocationBySerialNumber(): Generator<StrictEffect> {
    yield takeLatest(GET_LOCATION_BY_SERIAL_REQUEST, getLocationBySerialNumber);
}

/**
 * Worker Saga: Fired on GET_PROFILE_DATA_REQUEST action
 * It will call get API for profile data and store the fetch
 * response in redux
 */
export function* getProfileData(): Generator<StrictEffect> {
    const serialNum = getSerialNumber();
    if (serialNum && serialNum != '') {
        try {
            const response: any = yield call(
                axiosInstance.get,
                config.URL.MES_BASE_PATH() +
                    config.URL.PROFILE_BY_SERIAL_NUMBER(serialNum) +
                    '?includeAssignmentStatus=true',
            );
            const { data } = response;
            if (data && data.payload) {
                const profileData = Object.assign({}, appConfigTV.patientProfile, data.payload);
                yield put(
                    getProfileSuccess({
                        profilePayload: profileData,
                    }),
                );
            }
        } catch (e: any) {
            yield put(
                getProfileFailure({
                    error: e.message,
                }),
            );
        }
    }
}

/**
 * Starts worker saga on latest dispatched `GET_PROFILE_DATA_REQUEST` action.
 * Allows concurrent increments.
 */
export function* watchGetProfileData(): Generator<StrictEffect> {
    yield takeLatest(GET_PROFILE_DATA_REQUEST, getProfileData);
}

/**
 * Worker Saga: Fired on GET_EXT_APP_LIST_REQUEST action
 * It will call get API for external app list and store the fetch
 * response in redux
 */
export function* getExtAppList(): Generator<StrictEffect> {
    const externalApps = {
        entertainment: [] as any[],
        games: [] as any[],
        apps: [] as any[],
        home: [] as any[],
        myvisit: [] as any[],
        others: [] as any[],
    };
    try {
        const response: any = yield call(
            axiosInstance.get,
            config.URL.MES_BASE_PATH() +
                config.URL.CONFIGREGISTRY_CONFIGS() +
                `?startsWithConfigKey=${appConfigTV.externalappsBaseKey}`,
        );
        const { data } = response;
        if (data.payload && data.payload.keyValues && data.payload.keyValues.length > 0) {
            const keyValues = data.payload.keyValues;
            const extAppsNames = keyValues.filter(function (app: any) {
                return app.key.indexOf('.android.name') >= 0;
            });
            extAppsNames.map(function (app: any) {
                const appWiseList = keyValues.filter(function (keyValueObj: any) {
                    if (
                        keyValueObj.key &&
                        app.key &&
                        keyValueObj.key.indexOf('.ios.') == -1 &&
                        keyValueObj.key.indexOf(app.value.replace(/\s+/g, '').toLowerCase()) >= 0
                    ) {
                        return keyValueObj;
                    }
                });
                externalApps.apps.push({ name: app.value ? app.value.toLowerCase() : '', data: appWiseList });
            });
            externalApps.apps.filter(function (app) {
                const screenName = keyValues.filter(function (keyValueObj: any) {
                    return keyValueObj.key == app.data[0].key.replace(/\.android.*$/, '') + '.android.screenName';
                });
                if (screenName && screenName.length > 0 && screenName[0].value) {
                    if (screenName[0].value.indexOf(commonConst.ENTERTAINMENT) >= 0) {
                        externalApps.entertainment.push(app.data);
                    }
                    if (screenName[0].value.indexOf(commonConst.GAMES) >= 0) {
                        externalApps.games.push(app.data);
                    }
                    if (screenName[0].value.indexOf(commonConst.HOME) >= 0) {
                        externalApps.home.push(app.data);
                    }
                    if (screenName[0].value.indexOf(commonConst.MY_VISIT) >= 0) {
                        externalApps.myvisit.push(app.data);
                    }
                    if (screenName[0].value.indexOf(commonConst.OTHERS) >= 0) {
                        externalApps.others.push(app.data);
                    }
                }
            });
            externalApps.entertainment.sort(function (a, b) {
                const curSequence = a.filter(function (ak: any) {
                        return ak['key'].indexOf('.sequence') >= 0;
                    }),
                    nxtSequence = b.filter(function (ak: any) {
                        return ak['key'].indexOf('.sequence') >= 0;
                    });
                const curSequenceVal = curSequence[0] ? curSequence[0].value || 0 : 0,
                    nxtSequenceVal = nxtSequence[0] ? nxtSequence[0].value || 0 : 0;
                return curSequenceVal > nxtSequenceVal ? 1 : -1;
            });
            yield put(
                getExtAppsSuccess({
                    externalApps: externalApps,
                }),
            );
        }
    } catch (e: any) {
        yield put(
            getExtAppsFailure({
                error: e.message,
            }),
        );
    }
}

/**
 * Starts worker saga on latest dispatched `GET_EXT_APP_LIST_REQUEST` action.
 * Allows concurrent increments.
 */
export function* watchGetExtAppList(): Generator<StrictEffect> {
    yield takeLatest(GET_EXT_APP_LIST_REQUEST, getExtAppList);
}

/**
 * Worker Saga: Fired on GET_TENANT_PROPS_REQUEST action
 * It will call get API for tenant specific custimization
 * props and store the fetch
 * response in redux
 */
export function* getTenantCustomProps(): Generator<StrictEffect> {
    try {
        const response: any = yield call(
            axiosInstance.get,
            config.URL.MES_BASE_PATH() + config.URL.CUSTOM_TENANT_PROP() + '/' + commonConst.PATIENT_APP,
        );
        const { data } = response;
        if (data && data.payload && data.payload.resourceContent) {
            const customPropObj = JSON.parse(data.payload.resourceContent);
            yield put(
                getTenantPropSuccess({
                    tenantProps: customPropObj,
                }),
            );
        }
    } catch (e: any) {
        yield put(
            getTenantPropFailure({
                error: e.message,
            }),
        );
    }
}

/**
 * Starts worker saga on latest dispatched `GET_TENANT_PROPS_REQUEST` action.
 * Allows concurrent increments.
 */
export function* watchGetTenantCustomProps(): Generator<StrictEffect> {
    yield takeLatest(GET_TENANT_PROPS_REQUEST, getTenantCustomProps);
}

/**
 * Worker Saga: Fired on GET_ADMIN_PROPS_REQUEST action
 * It will call get API for admin specific custimization
 * props and store the fetch
 * response in redux
 */
export function* getAdminCustomProps(): Generator<StrictEffect> {
    try {
        const response: any = yield call(
            axiosInstance.get,
            config.URL.MES_BASE_PATH() +
                config.URL.CONFIGREGISTRY_CONFIGLIST() +
                '/?keys=patientapp.display.style,patientapp.display.style.selectionbordercolor,patientapp.display.style.selectionfillercolor,patientapp.defaultlocation.closedcaption,patientapp.defaultlocation.closedcaption.channel,patientapp.theme.tv,closedcaption.font.size;',
        );
        const { data } = response;
        if (data.payload && data.payload.keyValues.length > 0) {
            const propObj: any = {};
            const dataObj = data.payload.keyValues;
            for (let i = dataObj.length - 1; i >= 0; i--) {
                const config = dataObj[i];
                propObj[config.key] = config.value ? config.value : '';
            }
            yield put(
                getAdminPropSuccess({
                    adminProps: propObj,
                }),
            );
        }
    } catch (e: any) {
        yield put(
            getAdminPropFailure({
                error: e.message,
            }),
        );
    }
}

/**
 * Starts worker saga on latest dispatched `GET_ADMIN_PROPS_REQUEST` action.
 * Allows concurrent increments.
 */
export function* watchGetAdminCustomProps(): Generator<StrictEffect> {
    yield takeLatest(GET_ADMIN_PROPS_REQUEST, getAdminCustomProps);
}

/**
 * Starts worker saga on latest dispatched `GET_THEME_PROPERTIES_REQUEST` action.
 * Allows concurrent increments.
 */
export function* watchGetThemeConfigurations(): Generator<StrictEffect> {
    yield takeLatest(GET_THEME_PROPERTIES_REQUEST, getThemeConfigurations);
}

/**
 * Worker Saga: Fired on GET_THEME_PROPERTIES_REQUEST action
 * It will call get API for theme configurations, and store response in Application
 */
export function* getThemeConfigurations(): Generator<StrictEffect> {
    try {
        // TODO :: needed to assign these values from the patient profile data.
        const response: any = yield call(
            axiosInstance.get,
            config.URL.CONTENT_BASE_PATH() + config.URL.THEME_CONFIGURATIONS('en_US', 'NC-17'),
        );
        const { data } = response;
        if (data.payload && data.payload.properties) {
            const themeConfigurations: ThemeConfiguration = data.payload.properties;
            // Once the theme configuration from server have been added load the configuration into custom CSS variables.
            applyThemeConfigurations(themeConfigurations);
            yield put(
                getThemePropertiesSuccess({
                    themeConfiguration: themeConfigurations,
                }),
            );
        }
    } catch (e: any) {
        yield put(
            getThemePropertiesFailure({
                error: e.message,
            }),
        );
    }
}
