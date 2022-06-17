import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import * as sagas from '../../sagas/appSaga';
import * as actionTypes from '../../actions/appActionTypes';

describe('App Sagas', () => {
    describe('Get App List', () => {
        const mockResponse = [
            {
                appId: 'VIDEO_APPS',
                appName: 'Video Apps',
                appDescription: 'Video as App',
                appStatusCode: 'ENABLED',
                privacyApplicable: false,
                sequence: 90,
                availableWithoutAuth: true,
                hideInGuestMode: false,
            },
        ];
        it('takes every GET_APP_LIST_REQUEST and calls getAppList', () => {
            const generator = sagas.watchGetAppList();
            expect(generator.next().value).toEqual(takeLatest(actionTypes.GET_APP_LIST_REQUEST, sagas.getAppList));
        });

        it('should call api and dispatch GET_APP_LIST_SUCCESS action', async () => {
            const fetchAppList = jest
                .spyOn(axios, 'get')
                .mockImplementation(() => Promise.resolve({ data: { payload: { apps: mockResponse } } }));
            const dispatched: any[] = [];
            await runSaga(
                {
                    dispatch: (action) => dispatched.push(action),
                },
                sagas.getAppList,
            );

            expect(fetchAppList).toHaveBeenCalledTimes(1);
            expect(dispatched).toEqual([
                {
                    type: actionTypes.GET_APP_LIST_SUCCESS,
                    payload: { appList: mockResponse },
                },
            ]);
            fetchAppList.mockClear();
        });

        it('should call api and dispatch GET_APP_LIST_FAILURE action', async () => {
            const mockError = { message: 'something bad happened' };
            const fetchAppList = jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(mockError));
            const dispatched: any = [];
            await runSaga(
                {
                    dispatch: (action) => dispatched.push(action),
                },
                sagas.getAppList,
            );

            expect(fetchAppList).toHaveBeenCalledTimes(1);
            expect(dispatched).toEqual([
                {
                    type: actionTypes.GET_APP_LIST_FAILURE,
                    payload: { error: mockError.message },
                },
            ]);
            fetchAppList.mockClear();
        });
    });
});
