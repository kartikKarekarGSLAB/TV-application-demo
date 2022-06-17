import store from '../store';
import { getLocationBySerialNumberSuccess } from '../actions/appActions';
import { setUserIsAuthorized } from '../actions/loginAction';
import { LocationDetails, ApiStatus } from '../types/appTypes';
/**
 * This function return an condition to
 * show the login screen
 * @returns {string} condition for login screen
 */
export const getShowLoginScreenCondition = () => {
    const { login } = store.getState();
    const { conditionForLoginScreen } = login;
    return conditionForLoginScreen ? conditionForLoginScreen : null;
};

/**
 * This function will clear and add default value
 * in the redux store for location details object
 * and user autorization flag.
 */
export const onLoginClick = () => {
    const defaultData: any = {};
    store.dispatch(
        getLocationBySerialNumberSuccess({
            locationDetail: defaultData,
            locationStatus: defaultData,
        }),
    );
    store.dispatch(setUserIsAuthorized(false));
};

export const onLogoutClick = () => {
    console.log('logout button click');
};

export interface LoginFormat {
    payload: {
        locationIdFormatKeys: string[];
        status: any;
    };
}

/**
 * It is an interface for location by token
 * api which is used in login.tsx
 */
export interface LocationByToken {
    payload: LocationDetails;
    status: ApiStatus;
}
