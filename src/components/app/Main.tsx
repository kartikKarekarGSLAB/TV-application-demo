import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import {
    getLocationBySerialNumberRequest,
    getTenantPropRequest,
    getAdminPropRequest,
    getThemePropertiesRequest,
    getAppListRequest,
    getImgListRequest,
} from '../../actions/appActions';
import { setUserIsAuthorized, setDeviceNumberAndTenantId, setLoginLogoutButtonType } from '../../actions/loginAction';
import { axiosInstance } from '../../utils/axiosUtil';
import {
    PME_VERSION,
    IEP_AUTH_METHODS,
    AAD_OAUTH_2,
    OAUTH_2,
    ACCESS_TOKEN,
    ACCESS_TOKEN_TYPE,
    OAUTH_TYPE,
    WAITING_ROOM,
    HOME_SCREEN_PATH_NAME,
    PATIENT_ROOM,
} from '../../utils/commonConst';
import { getOAuthToken, GetOAuthInput, checkUserAuthorization } from '../../services/OAuthService';
import { appConfigTV } from '../../config/appConfigTV';

function Main() {
    const [searchParams] = useSearchParams();
    const { search } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { locationResponse } = useSelector((state: RootState) => state.app);
    const { locationDetail, locationStatus } = locationResponse;

    const number = searchParams.get('serialNumber');
    const tId = searchParams.get('tenant');

    useEffect(() => {
        if (number && tId) {
            dispatch(setDeviceNumberAndTenantId({ deviceNumber: number, tenantId: tId }));
        } else {
            return;
        }
        pmeVersion();
    }, []);

    useEffect(() => {
        onGetLocationBySerialNumberResponse();
    }, [locationStatus]);

    /**
     * This function need to call inside useEffect with locationStatus data trigger.
     * this function will call after getLocationBySerialNumberRequest return an response.
     * @locationStatus it is responsiable to run the onGetLocationBySerialNumberResponse function.
     */
    const onGetLocationBySerialNumberResponse = () => {
        if (locationStatus && locationStatus.statusCode == 200) {
            if (locationDetail && locationDetail.locationType != PATIENT_ROOM) {
                console.log(
                    'Main.tsx :: onGetLocationBySerialNumberResponse :: location type is ::',
                    locationDetail.locationType,
                );
                //showing the home screen with patient guest mode/guest room
                navigateToHomePage(locationDetail.locationType);
            } else if (locationDetail.preferences && locationDetail.preferences.multipleOccupancy == true) {
                console.log(
                    'Main.tsx :: onGetLocationBySerialNumberResponse :: multiple occupancye status is ::',
                    true,
                );
                //showing the home screen with patient guest mode/guest room
                navigateToHomePage(locationDetail.locationType);
            } else if (locationDetail && locationDetail.locationId) {
                checkUserAuthorization()?.then((nextPage: string) => {
                    if (nextPage && nextPage.length > 0) {
                        navigate({
                            pathname: `/${nextPage}`,
                            search: search,
                        });
                    }
                });
            } else {
                console.error(
                    'Main.tsx :: onGetLocationBySerialNumberResponse :: location detail not found ::',
                    locationDetail,
                );
            }
        } else if (locationStatus && locationStatus.statusCode == 404) {
            console.log('Main.tsx :: onGetLocationBySerialNumberResponse :: status is ::', locationStatus.statusCode);
            //Showing the home screen with public mode/waiting room
            navigateToHomePage(WAITING_ROOM);
        } else if (locationStatus && locationStatus.statusCode) {
            console.log('Main.tsx :: onGetLocationBySerialNumberResponse :: status object ::', locationStatus);
            //Showing the home screen with public mode/waiting room
            navigateToHomePage(WAITING_ROOM);
        }
    };

    /**
     * This function navigate to "HOME" page.
     * Before navigation it will dispatch bunch of actions to
     * save the data in redux store by calling APIs.
     * @param {string} roomType - It is an required parameter for
     * "getAppListRequest" action.
     * @param {string} loginScreenCondition - It is an condition for login screen
     * which is required field for "setConditionForLoginScreen" action
     */
    const navigateToHomePage = (roomType: string) => {
        dispatch(setUserIsAuthorized(true));
        dispatch(setLoginLogoutButtonType('login'));
        // dispatch(setConditionForLoginScreen(loginScreenCondition));
        dispatch(getAppListRequest(roomType));
        dispatch(getImgListRequest());
        navigate({
            pathname: `/${HOME_SCREEN_PATH_NAME}`,
            search: search,
        });
    };

    /**
     * This function navigate to "LOGIN" page.
     * Before navigation it will dispatch bunch of actions to
     * save the data in redux store by calling APIs.
     * @param {string} roomType - It is an required parameter for
     * "getAppListRequest" action.
     */
    // const navigateToLoginPage = (roomType: string) => {
    //     dispatch(setUserIsAuthorized(false));
    //     dispatch(getAppListRequest(roomType));
    //     dispatch(getImgListRequest());
    //     navigate({
    //         pathname: `/${LOGIN_SCREEN_PATH_NAME}`,
    //         search: search,
    //     });
    // };

    /**
     * This is the first API call which is excuted once the application up
     * & it will send "iep-auth-methods" in it's response headers
     */
    const pmeVersion = () => {
        axiosInstance
            .options(PME_VERSION)
            .then((response) => {
                const iepAuth = response.headers[IEP_AUTH_METHODS];
                const enableOAuth = iepAuth === AAD_OAUTH_2 || iepAuth === OAUTH_2;
                if (
                    window.sessionStorage.getItem(ACCESS_TOKEN) &&
                    window.sessionStorage.getItem(ACCESS_TOKEN_TYPE) &&
                    (window.sessionStorage.getItem(OAUTH_TYPE) == AAD_OAUTH_2 ||
                        window.sessionStorage.getItem(OAUTH_TYPE) == OAUTH_2)
                ) {
                    //TODO: Check with other developer what is use of above condition
                    // & how to use this condition correctly?
                } else if (iepAuth === AAD_OAUTH_2 && enableOAuth) {
                    //TODO: This block is used for azur login
                } else {
                    axiosInstance.defaults.headers.common['Accept'] = 'application/json';
                    axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
                    axiosInstance.defaults.headers.common['Authorization'] = 'Basic YXBpOmFwaWFkbWlu';

                    if (enableOAuth) {
                        const oAuthInputObj: GetOAuthInput = {
                            appMode: appConfigTV.OAuth.OAuthTokenGenerationCredentials.guestApp.userName,
                            grantType: 'password',
                            userName: appConfigTV.OAuth.OAuthTokenGenerationCredentials.guestApp.consumerKey,
                            password: appConfigTV.OAuth.OAuthTokenGenerationCredentials.guestApp.consumerSecret,
                            storeInLocal: false,
                        };
                        getOAuthToken(oAuthInputObj)?.then((obj) => {
                            if (obj.tokenSuccess) {
                                console.log('Main.tsx :: getOAuthToken success ::', obj.tokenSuccess);
                                dispatch(getTenantPropRequest());
                                dispatch(getAdminPropRequest());
                                dispatch(getThemePropertiesRequest());
                                dispatch(getLocationBySerialNumberRequest());
                            } else {
                                console.log('Main.tsx :: getOAuthToken failed ::', obj.tokenSuccess);
                            }
                        });
                    }
                }
            })
            .catch((error) => {
                console.error('Main :: pmeVersion.txt API error ::', error);
            });
    };

    return <></>;
}

export default Main;
