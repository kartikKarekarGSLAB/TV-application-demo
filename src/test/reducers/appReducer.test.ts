import reducers from '../../reducers/appReducer';
import * as actionTypes from '../../actions/appActionTypes';
import * as types from '../../types/appTypes';

describe('App Reducer', () => {
    let state: types.AppState | undefined;
    beforeEach(() => {
        state = {
            pending: false,
            appList: [],
            error: null,
            weather: {},
            location_detail: {},
        };
    });
    describe('Get App List', () => {
        it('on trigger GET_APP_LIST_REQUEST returns updated state', () => {
            const action: types.GetAppListRequest = {
                type: actionTypes.GET_APP_LIST_REQUEST,
            };
            expect(reducers(state, action)).toEqual({
                pending: true,
                appList: [],
                error: null,
            });
        });
        it('GET_APP_LIST_SUCCESS returns updated state', () => {
            const action: types.GetAppListSuccess = {
                type: actionTypes.GET_APP_LIST_SUCCESS,
                payload: { applications: [] },
            };
            expect(reducers(state, action)).toEqual({
                pending: false,
                appList: [],
                error: null,
            });
        });
        it('GET_APP_LIST_FAILURE returns updated state', () => {
            const action: types.GetAppListFailure = {
                type: actionTypes.GET_APP_LIST_FAILURE,
                payload: { error: 'Unable to load list' },
            };
            expect(reducers(state, action)).toEqual({
                pending: false,
                appList: [],
                error: 'Unable to load list',
            });
        });
    });
});
