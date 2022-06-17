import { combineReducers } from 'redux';
import appReducer from './appReducer';
import homeReducer from './homeReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
    app: appReducer,
    home: homeReducer,
    login: loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
