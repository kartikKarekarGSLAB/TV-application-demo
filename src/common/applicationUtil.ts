import store from '../store';
import { appConfigTV } from '../config/appConfigTV';
import { StatusApplicationData, IApp } from '../types/appTypes';
export const PHONE_RINGER_CONFIGURATION = 'PHONE_RINGER_CONFIGURATION';
export const PHONE = 'PHONE';
export const LIVE_TV = 'LIVE_TV';
export const PATIENT_PRIVACY = 'PATIENT_PRIVACY';
export const AUTO_ANSWER = 'AUTO_ANSWER';

/**
 * This will get the application configuration from the application list using the application name.
 * @param {array} applications this is the array of applications
 * @param {string} applicationName application name for which we needed to find the data.
 * @returns return the application configuration if found by the filter , null otherwise.
 */
export const getApplicationData = (applicationName: string) => {
    const { app } = store.getState();
    const { appList } = app;
    if (appList && appList.length > 0 && applicationName) {
        const foundApplication = appList.filter((app: IApp) => {
            return app.appId === applicationName;
        });
        if (foundApplication && foundApplication.length) {
            const statusApplicationData: StatusApplicationData = {
                id: foundApplication[0].appId,
                status: foundApplication[0].appStatusCode.toLowerCase() === 'enabled' ? true : false,
                privacy:
                    foundApplication[0].privacyCheck && foundApplication[0].privacyCheck.toLowerCase() === 'enabled'
                        ? true
                        : false,
            };
            return statusApplicationData;
        }
        return null;
    } else {
        console.debug('ApplicationUtil : application list is empty or applicationName for filter is null/empty');
    }
};

/**
 * This function will be used for the formatting of the phone number.
 * @param {string} phoneNumber phone number string
 * @returns formatted phone number value.
 */
export const formatPhoneNumber = (phoneNumber: string) => {
    const phoneNumberCopy = phoneNumber;
    phoneNumber = phoneNumber.toString().replace(/[^0-9]/g, '');
    let x: string = phoneNumber.replace(/\)\s*|\(\s*|-/g, '');
    x = x.replace(/\s/g, '');
    const y: string = phoneNumber.replace(/\)\s*|\(\s*|-/g, '');
    const length: number = y.replace(/\s/g, '').length;
    if (length == 1) {
        x = x.replace(/^(\d{1}).*/, '$1');
        phoneNumber = x;
    }
    if (length == 2) {
        x = x.replace(/^(\d{2}).*/, '$1');
        phoneNumber = x;
    }
    if (length == 3) {
        x = x.replace(/^(\d{3}).*/, '$1');
        phoneNumber = x;
    }
    if (length == 4) {
        x = x.replace(/^(\d{4}).*/, '$1');
        phoneNumber = x;
    }
    if (length == 5) {
        x = x.replace(/^(\d{1})(\d{4}).*/, '$1-$2');
        phoneNumber = x;
    }
    if (length == 6) {
        x = x.replace(/^(\d{2})(\d{4}).*/, '$1-$2');
        phoneNumber = x;
    }
    if (length == 7) {
        x = x.replace(/^(\d{3})(\d{4}).*/, '$1-$2');
        phoneNumber = x;
    }
    if (length == 8) {
        x = x.replace(/^(\d{1})(\d{3})(\d{4}).*/, '$1 $2-$3');
        phoneNumber = x;
    }
    if (length == 9) {
        x = x.replace(/^(\d{2})(\d{3})(\d{4}).*/, '$1 $2-$3');
        phoneNumber = x;
    }
    if (length == 10) {
        x = x.replace(/^(\d{3})(\d{3})(\d{4}).*/, '($1) $2-$3');
        phoneNumber = x;
    }
    if (length == 11) {
        x = x.replace(/^(\d{1})(\d{3})(\d{3})(\d{4}).*/, '$1 ($2) $3-$4');
        phoneNumber = x;
    }
    return phoneNumberCopy.indexOf('+') == -1 ? phoneNumber : '+' + phoneNumber;
};

/**
 * This function is used to return serial number
 * from store
 * @returns {string} serial/device number
 */
export const getSerialNumber = () => {
    const { login } = store.getState();
    const { urlQueryParameters } = login;
    return urlQueryParameters ? urlQueryParameters.deviceNumber : null;
};

/**
 * This function is used to return tenant id
 * from store
 * @returns {string} tenant id
 */
export const getTenantId = () => {
    const { login } = store.getState();
    const { urlQueryParameters } = login;
    return urlQueryParameters ? urlQueryParameters.tenantId : null;
};

/**
 * This function will return location id from locationResponse
 * object store
 * @returns {string} location id
 */
export const getLocationId = () => {
    const { app } = store.getState();
    const { locationResponse } = app;
    const { locationDetail } = locationResponse;
    return locationDetail ? locationDetail.locationId : null;
};

/**
 * This function will return patient prefer language
 * from patientProfile object from store
 * @returns {string} language
 */
export const getPatientPreferLanguage = () => {
    const { app } = store.getState();
    const { patientProfile } = app;
    if (patientProfile && patientProfile.patientHasPreferences) {
        return patientProfile.patientHasPreferences.language;
    } else {
        return appConfigTV.patientProfile.patientHasPreferences.language;
    }
};

/**
 * This function will return patient age category
 * from patientProfile object from store
 * @returns {string} age category
 */
export const getPatientAgeCategory = () => {
    const { app } = store.getState();
    const { patientProfile } = app;
    if (patientProfile && patientProfile.ageCategory) {
        return patientProfile.ageCategory;
    } else {
        return appConfigTV.patientProfile.ageCategory;
    }
};
