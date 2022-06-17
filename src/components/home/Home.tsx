import '../../assets/styles/Home.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { useTranslation } from 'react-i18next';
import PageTitle from '../common-components/page-title/PageTitle';
import GridView from '../grid-view/GridView';
import GridWrapper from '../Wrappers/GridWrapper/GridWrapper';
import { getVideoAppListRequest } from '../../actions/homeAction';
import {
    appConfigHomePageApps,
    patientIsAdmitted,
    prepareHomeAppData,
    getExternalApplications,
} from '../../utils/homeUtil';
import * as commonConst from '../../utils/commonConst';
import { appConfigTV } from '../../config/appConfigTV';
import { IHomeGridApp } from '../../types/homeTypes';

/**
 * This is the functional component for the Application.
 * @returns Home component component
 */
function Home() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [homeState, setHomeState] = useState({ pageTitleLabel: '', gridApps: [] as IHomeGridApp[] });
    const { appList, patientProfile, imageUrls } = useSelector((state: RootState) => state.app);
    const { videoApps } = useSelector((state: RootState) => state.home);

    useEffect(() => {
        dispatch(getVideoAppListRequest('HOME'));
    }, []);

    useEffect(() => {
        setHomeState({
            ...homeState,
            pageTitleLabel: getHomeText(),
            gridApps: getGridAppsList(),
        });
    }, [patientProfile, videoApps, appList, imageUrls]);

    const getHomeText = () => {
        return (
            t('home_welcome_label') +
            ' ' +
            ((patientProfile.preferredAlias && patientProfile.preferredAlias.displayName) || '')
        );
    };
    /**
     * It will return home applications list
     * with specific data
     * @returns grid app list
     */
    const getGridAppsList = () => {
        const gridAppList = [];
        const videoHomeApps = videoApps.home;
        const homePageApps = appConfigHomePageApps();
        if (appList && appList.length > 0) {
            if (videoHomeApps && videoHomeApps.length > 0) {
                videoHomeApps.sort(function (a, b) {
                    return a.title && b.title && a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
                });
            }

            const getAppDataFromProperties = function (appId: string) {
                return homePageApps.filter(function (app: { id: string }) {
                    return appId.toLowerCase() == (app.id && app.id.toLowerCase());
                });
            };
            for (let appIndex = 0, totalApps = appList ? appList.length : 0; appIndex < totalApps; appIndex++) {
                let appObj = getAppDataFromProperties(appList[appIndex].appId);
                if (
                    appList[appIndex].appStatusCode &&
                    appList[appIndex].appStatusCode.toLowerCase() == commonConst.ENABLED &&
                    appList[appIndex].appId &&
                    appObj.length > 0
                ) {
                    appObj = appObj[0];
                    if (
                        (appObj.id == 'LIVE_TV' && false) || //TODO: ADD showTV flag for prisoner profile
                        (appConfigTV.PatientSpecificApps.indexOf(appObj.id) >= 0 && !patientIsAdmitted())
                    ) {
                        //don't add it to the appslist
                    } else if (appObj.id == 'VIDEO_APPS') {
                        for (let i = 0; i < videoHomeApps.length; i++) {
                            gridAppList.push(
                                prepareHomeAppData(
                                    Object.assign(
                                        {},
                                        appObj,
                                        appList[appIndex].sequence ? { order: appList[appIndex].sequence } : {},
                                    ),
                                    videoHomeApps[i],
                                ),
                            );
                        }
                    } else {
                        gridAppList.push(
                            prepareHomeAppData(
                                Object.assign(
                                    {},
                                    appObj,
                                    appList[appIndex].sequence ? { order: appList[appIndex].sequence } : {},
                                ),
                                {},
                            ),
                        );
                    }
                }
            }
            const homeExternalApps = getExternalApplications('home');
            for (let i = 0; i < homeExternalApps.length; i++) {
                if (homeExternalApps[i].order) {
                    for (let ai = 0; ai < gridAppList.length; ai++) {
                        if (
                            gridAppList[ai].order >= homeExternalApps[i].order &&
                            gridAppList[ai].appName &&
                            gridAppList[ai].appName.indexOf(homeExternalApps[i].appName) == -1
                        ) {
                            if (
                                gridAppList[ai].order == homeExternalApps[i].order &&
                                !(gridAppList[ai].label.toLowerCase() > homeExternalApps[i].label.toLowerCase())
                            ) {
                                gridAppList.splice(ai + 1, 0, homeExternalApps[i]);
                            } else {
                                gridAppList.splice(ai, 0, homeExternalApps[i]);
                            }
                            break;
                        }
                    }
                } else {
                    gridAppList.push(homeExternalApps[i]);
                }
            }
            if (patientIsAdmitted()) {
                gridAppList.splice(0, 0, prepareHomeAppData(homePageApps[0], {}));
            }
        }
        return gridAppList;
    };

    const gridView = homeState.gridApps.length > 0 && <GridView appList={homeState.gridApps} />;

    return (
        <GridWrapper>
            <PageTitle showArrow={false} headerText={homeState.pageTitleLabel} />
            {gridView}
        </GridWrapper>
    );
}

export default Home;
