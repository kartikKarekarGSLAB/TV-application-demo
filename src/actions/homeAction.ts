//action TYPE constants related to home component
import { GET_VIDEO_APP_LIST_REQUEST, GET_VIDEO_APP_LIST_FAILURE, GET_VIDEO_APP_LIST_SUCCESS } from './homeActionTypes';

import {
    GetVideoAppListSuccessPayload,
    GetVideoAppListFailure,
    GetVideoAppListFailurePayload,
    GetVideoAppListRequest,
    GetVideoAppListSuccess,
} from '../types/homeTypes';

/**
 * This function triggers the getVideoAppList saga function
 * @param screenName string
 * @return {Object} type
 */
export const getVideoAppListRequest = (screenName: string): GetVideoAppListRequest => ({
    type: GET_VIDEO_APP_LIST_REQUEST,
    payload: {
        screenName: screenName,
    },
});

/**
 * This function store list of video app in the root store.
 * @param {GetAppListSuccessPayload} payload
 * @return {Object} type and list of app array
 */
export const getVideoAppListSuccess = (payload: GetVideoAppListSuccessPayload): GetVideoAppListSuccess => ({
    type: GET_VIDEO_APP_LIST_SUCCESS,
    payload,
});

/**
 * This function add error/failure message in the root store.
 * @param {GetAppListFailurePayload} payload
 * @return {Object} type and error message
 */
export const getVideoAppListFailure = (payload: GetVideoAppListFailurePayload): GetVideoAppListFailure => ({
    type: GET_VIDEO_APP_LIST_FAILURE,
    payload,
});
