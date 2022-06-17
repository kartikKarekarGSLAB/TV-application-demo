import * as actions from '../../actions/appActions';
import * as types from '../../actions/appActionTypes';

describe('App Actions', () => {
    it('getAppListRequest returns action', () => {
        expect(actions.getAppListRequest()).toEqual({
            type: types.GET_APP_LIST_REQUEST,
        });
    });
    it('getAppListSuccess returns action', () => {
        expect(actions.getAppListSuccess({ applications: [] })).toEqual({
            type: types.GET_APP_LIST_SUCCESS,
            payload: { appList: [] },
        });
    });
    it('getAppListFailure returns action', () => {
        expect(actions.getAppListFailure({ error: 'Unable to load list' })).toEqual({
            type: types.GET_APP_LIST_FAILURE,
            payload: { error: 'Unable to load list' },
        });
    });
});
