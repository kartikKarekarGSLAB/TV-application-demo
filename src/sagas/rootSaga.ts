import { all } from 'redux-saga/effects';
import {
    watchGetAppList,
    watchGetLocationBySerialNumber,
    watchWeatherInformation,
    watchGetImgList,
    watchGetProfileData,
    watchGetExtAppList,
    watchGetTenantCustomProps,
    watchGetAdminCustomProps,
    watchGetThemeConfigurations,
} from './appSaga';
import { watchGetVideoAppList } from './homeSage';

export default function* rootSaga() {
    yield all([
        watchGetAppList(),
        watchWeatherInformation(),
        watchGetLocationBySerialNumber(),
        watchGetProfileData(),
        watchGetImgList(),
        watchGetExtAppList(),
        watchGetTenantCustomProps(),
        watchGetAdminCustomProps(),
        watchGetVideoAppList(),
        watchGetThemeConfigurations(),
    ]);
}
