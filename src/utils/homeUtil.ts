import store from '../store';
import { appConfigTV } from '../config/appConfigTV';
import { APP_NAMES, APPS_PRIVACY_LOCK } from './commonConst';
import { getApplicationData } from '../common/applicationUtil';
import i18n from 'i18next';

/**
 * It will check patient data at store
 * @return boolean
 */
export const patientIsAdmitted = () => {
    const { app } = store.getState();
    if (app.patientProfile && app.patientProfile.patientId) {
        return true;
    }
    return false;
};

/**
 * It will check for privacyDataLock in side
 * patient profile data
 * @return boolean
 */
export const getAppsPrivacyStatus = () => {
    const { app } = store.getState();
    const { patientProfile } = app;
    if (patientProfile && patientProfile.patientHasPreferences) {
        return patientProfile.patientHasPreferences['privacyDataLock'] || false;
    }
    return false;
};

/**
 * It will check privacy flag for particular app
 * @param appId
 * @return boolean
 */
export const showPrivacyLockIndicator = (appId: string) => {
    if (patientIsAdmitted() && getAppsPrivacyStatus()) {
        const appIdConfigObj = getApplicationData(appId);
        return appIdConfigObj && appIdConfigObj.privacy ? appIdConfigObj.privacy : false;
    }
    return false;
};

/**
 * This will return the VideoApps stored inside the video application
 * @returns VideoApps list stored from the state.
 */
export const getStoreVideoAppList = () => {
    const { home } = store.getState();
    return home.videoApps;
};

/**
 * This will return the sorted application list.
 * @returns stored home application list
 */
export const appConfigHomePageApps = () => {
    const homeApps = appConfigTV.HomePageApps;
    return homeApps.sort(function (a: { order: number }, b: { order: number }) {
        return a.order - b.order;
    });
};

/**
 * This will generate the application based on the values.
 * @param appObj application object
 * @param videoObj video application object
 * @returns application data
 */
export const prepareHomeAppData = (appObj: any, videoObj: any) => {
    const { app } = store.getState();
    let appData: any = {};
    if (appObj.id == 'VIDEO_APPS') {
        if (videoObj) {
            appData = {
                id: appObj.id,
                state: videoObj.libraryId ? 'INDEX_VIDEO_LIBRARY' : appObj.id,
                imageURL: videoObj.thumbnailUri,
                selectionImageURL: videoObj.thumbnailUri,
                label: videoObj.title,
                order: appObj.order,
                videoUrl: videoObj.libraryId ? videoObj.libraryId : videoObj,
                showPrivacyLock: showPrivacyLockIndicator(appObj.id),
            };
        }
    } else {
        appData = {
            id: appObj.id,
            state: appObj.state,
            appName: APP_NAMES[appObj.state],
            imageURL: app.imageUrls[appConfigTV.nuxeoImageTags.appImages[appObj.imageTag]],
            selectionImageURL: app.imageUrls[appConfigTV.nuxeoImageTags.appImagesSelected[appObj.imageTag]],
            label: i18n.t(appObj.resourceId),
            order: appObj.order,
            videoUrl: '',
            showPrivacyLock: showPrivacyLockIndicator(appObj.id),
        };
    }
    return appData;
};

/**
 * This will return the values store inside state for the same.
 * @param type key from the external application state value
 * @returns array of all properties stored inside state, null otherwise
 */
export const getExternalApplicationValue = (type: string) => {
    const { app } = store.getState();
    if (app && app.externalApps && app.externalApps[type] && app.externalApps[type].length > 0) {
        return app.externalApps[type];
    }
    return null;
};

/**
 * This function will return the application list based on the type passed, empty otherwise
 * @param type external application type
 * @returns array of external application for the application type passed
 */
export const getExternalApplications = (type: string) => {
    const appsList: any[] = [];
    const { app } = store.getState();
    const { locationResponse } = app;
    const { locationDetail } = locationResponse;
    let locationType = '';
    if (locationResponse.locationDetail && locationDetail.locationType) {
        locationType = locationDetail.locationType;
    }
    const propertiesArray = getExternalApplicationValue(type);
    if (propertiesArray && propertiesArray.length) {
        propertiesArray.map((externalApplication: any) => {
            // Get the status of the application.
            const status = externalApplication.filter((keyValueProperty: any) => {
                return keyValueProperty.key.indexOf('.show') >= 0;
            });
            // Get the location type of the application.
            const locationTypes = externalApplication.filter((keyValueProperty: any) => {
                return keyValueProperty.key.indexOf('.locationTypes') >= 0;
            });
            // Add the application to list only if the application status is enabled and location type matching the required type.
            if (
                status &&
                status.length > 0 &&
                status[0].value == 'true' &&
                locationTypes &&
                locationTypes.length > 0 &&
                locationTypes[0].value &&
                locationTypes[0].value.indexOf(locationType) >= 0
            ) {
                const name = externalApplication.filter((keyValueProperty: any) => {
                    return keyValueProperty.key.indexOf('.name') >= 0;
                });
                const imageTag = externalApplication.filter((keyValueProperty: any) => {
                    return keyValueProperty.key.indexOf('.appIconTag') >= 0;
                });
                const packageName = externalApplication.filter((keyValueProperty: any) => {
                    return keyValueProperty.key.indexOf('.appUrl') >= 0;
                });
                const storeUrl = externalApplication.filter((keyValueProperty: any) => {
                    return keyValueProperty.key.indexOf('.webUrl') >= 0;
                });
                const sequence = externalApplication.filter((keyValueProperty: any) => {
                    return keyValueProperty.key.indexOf('.sequence') >= 0;
                });
                let imageURL = '';
                let selectionImageURL = '';
                if (imageTag[0] && imageTag[0].value) {
                    imageURL = app.imageUrls[imageTag[0].value];
                    selectionImageURL = app.imageUrls[imageTag[0].value];
                }
                appsList.push({
                    id: 'EXTERNAL_APP',
                    state: 'LAUNCH_EXTERNAL_APP',
                    appName: name[0] ? name[0].value : '',
                    imageURL: imageURL,
                    selectionImageURL: selectionImageURL,
                    label: name[0] ? name[0].value : '',
                    sequence: sequence[0] ? parseInt(sequence[0].value) : '',
                    order: sequence[0] ? parseInt(sequence[0].value) : '',
                    actionData: {
                        url: storeUrl[0] ? storeUrl[0].value : '',
                        packageName: packageName[0] ? packageName[0].value : '',
                    },
                });
            }
        });
    }
    return appsList;
};

export const getPrivacyLockImg = () => {
    const { app } = store.getState();
    return app.imageUrls[appConfigTV.nuxeoImageTags.headerIcons[APPS_PRIVACY_LOCK]];
};
