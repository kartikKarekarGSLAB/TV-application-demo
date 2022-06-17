/**
 * This file will contain all the interface, type and there data type
 * which is used or required of HOME component and there related operation.
 */

import {
    GET_VIDEO_APP_LIST_REQUEST,
    GET_VIDEO_APP_LIST_SUCCESS,
    GET_VIDEO_APP_LIST_FAILURE,
} from '../actions/homeActionTypes';

export interface IHomeGridApp {
    id: string;
    state: string;
    appName: string;
    imageURL: string;
    selectionImageURL: string;
    label: string;
    order: number;
    videoUrl: any;
    showPrivacyLock: boolean;
    actionData: any;
}
/**
 * This type is defined for the Home Application response.
 */
export interface IHomeApp {
    availableInLanguages: IVideoAppLang[];
    staged: boolean;
    title: string;
    httpUri: string;
    description: string;
    contentVideoPk: string;
    videoId: string;
    thumbnailUri: string;
    duration: string;
    uniqueProviderId: string;
    defaultTitle: string;
    language: string;
    commonKey: string;
    topLevelCategory: string;
    external: boolean;
    providerId: string;
    contentVideoProgressVO: {
        viewedPercentage: number;
        viewCount: number;
    };
    minAge: number;
    maxAge: number;
    screenName: string;
    availableWithoutAuth: boolean;
    hideInGuestMode: boolean;
}
export interface IVideoAppLang {
    staged: boolean;
    title: string;
    httpUri: string;
    description: string;
    contentVideoPk: string;
    videoId: string;
    thumbnailUri: string;
    duration: string;
    uniqueProviderId: string;
    defaultTitle: string;
    language: string;
    commonKey: string;
    topLevelCategory: string;
    external: boolean;
    providerId: string;
    contentVideoProgressVO: {
        viewedPercentage: number;
        viewCount: number;
    };
    minAge: number;
    maxAge: number;
    availableWithoutAuth: boolean;
    hideInGuestMode: boolean;
}

/**
 * This type is used for video apps object.
 */
export interface IVideoApps {
    home: IHomeApp[];
    myVisit: any;
}
/**
 * This type is used during the SUCCESS state of API response for video app List.
 */
export interface GetVideoAppListSuccessPayload {
    videoApps: IVideoApps;
}

/**
 * This type is used during the FAILURE state of API response for video aPP List.
 */
export interface GetVideoAppListFailurePayload {
    error: string;
}

/**
 * This type is used to indicate the video app List API call is initiated,
 * usually used such APIs to show the loading state of application.
 */
export interface GetVideoAppListRequest {
    type: typeof GET_VIDEO_APP_LIST_REQUEST;
    payload: {
        screenName: string;
    };
}

/**
 * This type is used to indicate the video app List API call is successfully completed.
 */
export type GetVideoAppListSuccess = {
    type: typeof GET_VIDEO_APP_LIST_SUCCESS;
    payload: GetVideoAppListSuccessPayload;
};

/**
 * This type is used to indicate the Video app List API call resulted into failure.
 */
export type GetVideoAppListFailure = {
    type: typeof GET_VIDEO_APP_LIST_FAILURE;
    payload: GetVideoAppListFailurePayload;
};

/**
 * This indicate the home state.
 */
export interface homeState {
    videoApps: {
        home: IHomeApp[];
        myVisit: any;
    };
}

export type homeAction = GetVideoAppListRequest | GetVideoAppListSuccess | GetVideoAppListFailure;
