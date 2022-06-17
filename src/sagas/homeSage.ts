import { axiosInstance } from '../utils/axiosUtil';
import { call, put, StrictEffect, takeLatest } from 'redux-saga/effects';
import { getVideoAppListSuccess, getVideoAppListFailure } from '../actions/homeAction';
import { GET_VIDEO_APP_LIST_REQUEST } from '../actions/homeActionTypes';
import { config } from '../config/config';
import { getStoreVideoAppList } from '../utils/homeUtil';
import * as commonConst from '../utils/commonConst';
import { IVideoApps } from '../types/homeTypes';

/**
 * Worker Saga: Fired on GET_VIDEO_APP_LIST_REQUEST action
 * It will call get API for video app list and store the fetch
 * response in redux
 */
export function* getVideoAppList(action: any): Generator<StrictEffect> {
    const screenName = action.payload.screenName;
    const storeVideoApp = getStoreVideoAppList();
    try {
        const response: any = yield call(
            axiosInstance.get,
            config.URL.BASE_VERSION() +
                config.URL.VIDEO_APP() +
                `?includeAllLanguages=true&screenName=${screenName}&locale=en_US`,
        );
        const { data } = response;
        if (data.payloadList && data.payloadList.length > 0) {
            const tempVideoApps: IVideoApps = {
                home: [],
                myVisit: [],
            };
            if (screenName === commonConst.HOME) {
                tempVideoApps.home = data.payloadList;
                tempVideoApps.myVisit = storeVideoApp.myVisit;
            } else if (screenName === commonConst.MY_VISIT) {
                tempVideoApps.myVisit = data.payloadList;
                tempVideoApps.home = storeVideoApp.home;
            }
            yield put(
                getVideoAppListSuccess({
                    videoApps: tempVideoApps,
                }),
            );
        }
    } catch (e: any) {
        yield put(
            getVideoAppListFailure({
                error: e.message,
            }),
        );
    }
}

/**
 * Starts worker saga on latest dispatched `GET_VIDEO_APP_LIST_REQUEST` action.
 * Allows concurrent increments.
 */
export function* watchGetVideoAppList(): Generator<StrictEffect> {
    yield takeLatest(GET_VIDEO_APP_LIST_REQUEST, getVideoAppList);
}
