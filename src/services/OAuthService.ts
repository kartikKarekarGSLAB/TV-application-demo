import { appConfigTV } from '../config/appConfigTV';
import { config } from '../config/config';
import { generateBasicAuthToken } from './authorizationService';
import { getTenantId, getLocationId, getSerialNumber } from '../common/applicationUtil';
import { axiosInstance } from '../utils/axiosUtil';
import { HOME_SCREEN_PATH_NAME, LOGIN_SCREEN_PATH_NAME, PATIENT_ROOM, GUEST_ROOM } from '../utils/commonConst';
import store from '../store';
import { setUserIsAuthorized, setLoginLogoutButtonType } from '../actions/loginAction';
import { getImgListRequest, getAppListRequest, getProfileRequest, getExtAppsRequest } from '../actions/appActions';

/***
 * This interface is used for
 * getOAuthToken functions param object
 */
export interface GetOAuthInput {
    appMode: string;
    grantType: string;
    userName: string;
    password: string;
    storeInLocal: boolean;
}

/**
 * This interface is used for genrate
 * OAuth token reponse in getOAuthToken
 */
export interface OAuthRespInterface {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
    scope: string;
    'iep-tenant-id': string;
    jti: string;
}

/**
 * This function is used to make genrate OAuth token api call
 * and save that token in axios default header
 * @param {GetOAuthInput} inputObj
 * @returns {object}
 */
export const getOAuthToken = (inputObj: GetOAuthInput) => {
    let basicAuthForGuestToken = '',
        basicAuthForPatientToken = '',
        payLoadObj;
    const OauthConfig = appConfigTV.OAuth;
    const { appMode, grantType, userName, password, storeInLocal } = inputObj;
    const tenantId = getTenantId();
    const returnObj: any = {
        tokenSuccess: false,
        statusCode: 0,
    };

    const tenantPassword = process.env.REACT_APP_GUEST_TENANT_PASSWORD || '';
    const guestPassword = process.env.REACT_APP_GUEST_PASSWORD || '';

    if (appMode.indexOf('guest') > -1)
        basicAuthForGuestToken = generateBasicAuthToken(
            OauthConfig.OAuthTokenGenerationCredentials.guestApp.consumerKey,
            OauthConfig.OAuthTokenGenerationCredentials.guestApp.consumerSecret,
        );

    if (appMode == 'patient')
        basicAuthForPatientToken = generateBasicAuthToken(
            OauthConfig.OAuthTokenGenerationCredentials.patientApp.consumer_key,
            OauthConfig.OAuthTokenGenerationCredentials.patientApp.consumer_secret,
        );

    if (grantType == 'refresh_token') {
        if (localStorage.getItem('user-auto-login-oauth')) {
            const userAutoLoginOauth = JSON.parse(localStorage.getItem('user-auto-login-oauth') || '{}');
            const refreshToken = userAutoLoginOauth.refreshToken ? userAutoLoginOauth.refreshToken : '';
            payLoadObj = {
                grant_type: grantType,
                refresh_token: refreshToken,
            };
        } else {
            console.log(
                'getOAuthToken :: Localstorage auto login data is not available for refresh_token ::',
                localStorage.getItem('user-auto-login-oauth'),
            );
            return Promise.resolve(false);
        }
    } else {
        if (appMode == 'patient') {
            payLoadObj = {
                grant_type: grantType,
                username: userName,
                password: password,
                scope: OauthConfig.OAuthTokenGenerationCredentials.patientApp.scope,
            };
        } else {
            const passwordForGuestToken =
                tenantId && tenantId.length > 0 ? tenantPassword.replace('tenantId', tenantId) : guestPassword;
            let userNameForGuestToken =
                tenantId && tenantId.length > 0
                    ? OauthConfig.OAuthTokenGenerationCredentials.guestApp.tenantUserName.replace('tenantId', tenantId)
                    : OauthConfig.OAuthTokenGenerationCredentials.guestApp.userName;

            if (appMode == 'location_guest') {
                //TODO: Need to add locationId in userNameForGuestToken
                userNameForGuestToken = '' + '_GUEST';
            }

            payLoadObj = {
                grant_type: 'password',
                username: userNameForGuestToken,
                password: passwordForGuestToken,
                scope: OauthConfig.OAuthTokenGenerationCredentials.guestApp.scope,
            };
        }
    }
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: appMode == 'patient' ? basicAuthForPatientToken : basicAuthForGuestToken,
    };

    return axiosInstance
        .post<OAuthRespInterface>(config.URL.BASE_VERSION() + OauthConfig.OAuthAPI, payLoadObj, {
            headers: headers,
            transformRequest: function (obj) {
                const str = [];
                for (const p in obj) str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                return str.join('&');
            },
        })
        .then((response) => {
            if (response.status === 200 && response.data) {
                if (response.data.access_token) {
                    const oAuthServiceObj = {
                        tokenType: response.data.token_type
                            ? response.data.token_type.charAt(0).toUpperCase() + response.data.token_type.slice(1)
                            : OauthConfig.OAuthTokenType,

                        tokenExpiryTime: response.data.expires_in ? response.data.expires_in : 300,
                        accessToken: response.data.access_token || '',
                        refreshToken: response.data.refresh_token || '',
                        scope: response.data.scope
                            ? response.data.scope
                            : OauthConfig.OAuthTokenGenerationCredentials.patientApp.scope,
                        tokenFor: appMode,
                    };
                    if (storeInLocal) {
                        localStorage.setItem('user-auto-login-oauth', JSON.stringify(oAuthServiceObj));
                    }
                    axiosInstance.defaults.headers.common['Authorization'] =
                        oAuthServiceObj.tokenType + ' ' + oAuthServiceObj.accessToken;

                    if (tenantId) axiosInstance.defaults.headers.common['iep-tenant-id'] = tenantId;

                    returnObj.tokenSuccess = true;
                    returnObj.statusCode = response.status;
                    return returnObj;
                } else {
                    console.log(
                        'getOAuthToken :: New access token for ' +
                            appMode +
                            ' was not generated. Request grant type: ' +
                            grantType,
                        +'::',
                    );
                    console.log('getOAuthToken :: Response ::', JSON.stringify(response.data));
                    console.info(
                        'getOAuthToken :: Token generate API response status: ' +
                            response.status +
                            'status text: ' +
                            response.statusText +
                            '::',
                    );
                    return returnObj;
                }
            } else {
                console.info('getOAuthToken :: Response data not avaialble for token generation API ::');
                console.info('getOAuthToken :: Token generation API request config ::');
            }
            return returnObj;
        })
        .catch((error) => {
            const errorResp = error.response;
            console.info('getOAuthToken :: Error in obtaning oAuth token payload from API ::', errorResp);
            console.log('getOAuthToken :: Token generation API Error ::', errorResp);
            returnObj.statusCode = errorResp.status;
            return returnObj;
        });
};

/**
 * This function is used to make API call to get
 * user authorization or pin details
 * @returns response of API
 */
export const getUserAuthorizationDetail = () => {
    const locationId = getLocationId();
    const serialNumber = getSerialNumber();
    if (locationId && locationId.length > 0 && serialNumber && serialNumber.length > 0) {
        return axiosInstance
            .get<any>(config.URL.USER_AUTHORIZATION(locationId) + `?device=${serialNumber}&deviceType=DEVICE`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                const errorResp = error.response;
                if (errorResp.data && errorResp.data.status && errorResp.data.status.statusCode) {
                    return errorResp.data;
                } else {
                    return null;
                }
            });
    } else {
        console.log('locationId or serial number is not found in store');
        return Promise.resolve('');
    }
};

/**
 * This function is used to check the user is authorized or not
 * and depending on statusCode it will return the path of next page
 * @returns {string} next page path
 */
export const checkUserAuthorization = () => {
    const locationId = getLocationId();
    return getUserAuthorizationDetail().then((userAuthData) => {
        if (userAuthData && userAuthData.status && userAuthData.status.statusCode) {
            if (userAuthData.status.statusCode == 200) {
                const oAuthInputObj: GetOAuthInput = {
                    appMode: 'patient',
                    grantType: 'password',
                    userName: locationId,
                    password: userAuthData.payload ? userAuthData.payload.password : '',
                    storeInLocal: true,
                };
                return getOAuthToken(oAuthInputObj).then((obj) => {
                    if (obj.tokenSuccess) {
                        store.dispatch(setUserIsAuthorized(true));
                        store.dispatch(setLoginLogoutButtonType(''));
                        store.dispatch(getAppListRequest(PATIENT_ROOM));
                        store.dispatch(getProfileRequest());
                        store.dispatch(getImgListRequest());
                        store.dispatch(getExtAppsRequest());
                        return HOME_SCREEN_PATH_NAME;
                    }
                });
            } else if (userAuthData.status.statusCode == 404) {
                console.log(
                    'getUserAuthorizationDetail :: Patient auth details status code is 404 - show the location patient room without admitted ::',
                );
                store.dispatch(getAppListRequest(GUEST_ROOM));
                store.dispatch(getImgListRequest());
                store.dispatch(setUserIsAuthorized(true));
                store.dispatch(setLoginLogoutButtonType('login'));
                return HOME_SCREEN_PATH_NAME;
            } else if (userAuthData.status.statusCode == 401 || userAuthData.status.statusCode == 403) {
                console.log(
                    'getUserAuthorizationDetail :: Patient auth details code is 401/403 - going to show the login ::',
                );
                store.dispatch(setUserIsAuthorized(false));
                store.dispatch(getAppListRequest(GUEST_ROOM));
                store.dispatch(getImgListRequest());
                return LOGIN_SCREEN_PATH_NAME;
            } else {
                console.log('getUserAuthorizationDetail :: Patient auth details code is 500 or other ::', userAuthData);
            }
        } else if (userAuthData == '') {
            console.log('getUserAuthorizationDetail :: locationId is not found in store ::');
            return userAuthData;
        } else {
            console.log('getUserAuthorizationDetail :: Patient auth details api response data is null::', userAuthData);
        }
    });
};
