import { GET_VIDEO_APP_LIST_SUCCESS, GET_VIDEO_APP_LIST_FAILURE } from '../actions/homeActionTypes';

import { homeAction, homeState } from '../types/homeTypes';

/**
 * This will indicate the initial state of application.
 */
const initialState: homeState = {
    videoApps: {
        home: [],
        myVisit: [],
    },
};

/**
 * This function maintain and update the state of Application
 * @param {Object} state for the first iteration it indicate the initial state, later holds the previous state value.
 * @param {Object} action action object.
 * @returns {Object} updated state value
 */

export default (state = initialState, action: homeAction) => {
    switch (action.type) {
        case GET_VIDEO_APP_LIST_SUCCESS:
            return {
                ...state,
                videoApps: action.payload.videoApps,
            };
        case GET_VIDEO_APP_LIST_FAILURE:
            return {
                ...state,
                error: action.payload.error,
            };
        default:
            return {
                ...state,
            };
    }
};
