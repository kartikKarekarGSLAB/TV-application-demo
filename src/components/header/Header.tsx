import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { getWeatherRequest } from '../../actions/appActions';
import { Grid, Typography, Button } from '@mui/material';
import '../../assets/styles/Header.scss';
import { appConfigTV } from '../../config/appConfigTV';
import Image from './../common-components/image/Image';
import HeaderStatusToggleIcons from './HeaderStatusToggleIcons';
import HeaderStatusIcons from './HeaderStatusIcons';
import HeaderInformationContainer from './HeaderInformationContainer';
import {
    getApplicationData,
    PHONE_RINGER_CONFIGURATION,
    PHONE,
    PATIENT_PRIVACY,
    LIVE_TV,
} from './../../common/applicationUtil';
import { onLoginClick } from '../../utils/loginUtil';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../assets/styles/Header.scss';

function Header() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { weather, imageUrls, patientProfile } = useSelector((state: RootState) => state.app);
    const { loginLogoutButton, userIsAuthorized } = useSelector((state: RootState) => state.login);
    useEffect(() => {
        dispatch(getWeatherRequest());
    }, []);
    const customerLogo = imageUrls[appConfigTV.nuxeoImageTags.headerLogo];
    const videoCallOnIcon = imageUrls[appConfigTV.nuxeoImageTags.headerIcons.PHONECAMERA_ENABLED];
    const videoCallOffIcon = imageUrls[appConfigTV.nuxeoImageTags.headerIcons.PHONECAMERA_DISABLED];
    const phoneRingerOnIcon = imageUrls[appConfigTV.nuxeoImageTags.headerIcons.PHONERINGER_ENABLED];
    const phoneRingerOffIcon = imageUrls[appConfigTV.nuxeoImageTags.headerIcons.PHONERINGER_DISABLED];
    const privacyLockIcon = imageUrls[appConfigTV.nuxeoImageTags.headerIcons.PRIVACY_LOCK];
    const privacyUnlockIcon = imageUrls[appConfigTV.nuxeoImageTags.headerIcons.PRIVACY_UNLOCK];
    const autoAnswerOnIcon = imageUrls[appConfigTV.nuxeoImageTags.headerIcons.PHONE_AUTO_ANSWER_ACTIVATED];

    const phoneRingerApplication = getApplicationData(PHONE_RINGER_CONFIGURATION);
    const phone = getApplicationData(PHONE);
    let patientPrivacy = null;
    let liveTV = null;
    let autoAnswer = false;
    let isPatientAvailable = false;
    const isMonitoring = false;
    if (patientProfile) {
        // IF patient found.
        isPatientAvailable = true;
        const patientPreferences = patientProfile.patientHasPreferences;
        if (patientPreferences) {
            // Show status icons for:Ringer,TVApp, AutoAnswer, phoneApp, Privacy,
            patientPrivacy = getApplicationData(PATIENT_PRIVACY);
            liveTV = getApplicationData(LIVE_TV);
            // Generate the data for status bar.
        } else {
            console.debug('Header: Component :: no patient preferences available.');
        }
        if (patientProfile.phonePreferences) {
            autoAnswer =
                patientProfile.phonePreferences.autoAnswerAsVideo || patientProfile.phonePreferences.autoAnswerAsAudio;
        }
    } else {
        console.debug('Header: Component :: no patient profile available.');
        console.log('Header: TV Application status :: ', liveTV);
    }

    /**
     * This will clear some of the redux store data
     * and re-run the login flow from starting point
     * by navigate to main tsx
     */
    const onClickOfLogin = () => {
        onLoginClick();
        navigate({
            pathname: `/`,
            search: search,
        });
    };
    return (
        <Grid container className="header" sx={{ pt: { xs: 1, lg: 1, xl: 0 } }}>
            {/* Header :: Customer Logo. */}
            <Grid
                item
                xs={3}
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                }}
            >
                <Image src={customerLogo} alt="hospital-logo" classes="logo" defaultSrc="" />
            </Grid>
            {/* Header :: Location and weather information */}
            <Grid
                item
                xs={6}
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    pb: { xs: 1, lg: 1, xl: 3 },
                }}
            >
                <HeaderInformationContainer weather={weather} />
            </Grid>
            {/* Header :: Status information */}
            <Grid
                item
                xs={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'flex-end',
                    pb: 1,
                }}
            >
                {
                    //TODO: Login button added temporary in future need to remove
                    userIsAuthorized && loginLogoutButton == 'login' ? (
                        <Button variant="contained" className="header-login-button" onClick={onClickOfLogin}>
                            <Typography variant="button">Login</Typography>
                        </Button>
                    ) : (
                        <></>
                    )
                }
                {isPatientAvailable ? (
                    <>
                        {/* Auto Answer Icon */}
                        <HeaderStatusIcons
                            state={{
                                isEnabled: autoAnswer,
                                iconSrc: autoAnswerOnIcon,
                                stateFor: 'autoAnswer',
                            }}
                        />
                        {/* Monitoring Icon */}
                        <HeaderStatusIcons
                            state={{
                                isEnabled: isMonitoring,
                                // TODO : Update this with the monitoring icon.
                                iconSrc: '',
                                stateFor: 'monitoring',
                            }}
                        />
                        {/* Present Status Icon */}
                        <HeaderStatusIcons
                            state={{
                                isEnabled: false,
                                // TODO : Update this with the presence status icon.
                                iconSrc: '',
                                stateFor: 'presentStatus',
                            }}
                        />
                        {/* Phone Application Status Icon */}
                        <HeaderStatusToggleIcons
                            state={{
                                isEnabled: phone ? phone.status : false,
                                onIconSrc: videoCallOnIcon,
                                offIconSrc: videoCallOffIcon,
                                stateFor: 'phoneApplication',
                            }}
                        />
                        {/* Phone Ringer Status Icon */}
                        <HeaderStatusToggleIcons
                            state={{
                                isEnabled: phoneRingerApplication ? phoneRingerApplication.status : false,
                                onIconSrc: phoneRingerOnIcon,
                                offIconSrc: phoneRingerOffIcon,
                                stateFor: 'phoneRinger',
                            }}
                        />
                        {/* Privacy Status Icon */}
                        <HeaderStatusToggleIcons
                            state={{
                                isEnabled: patientPrivacy ? patientPrivacy.status : false,
                                onIconSrc: privacyLockIcon,
                                offIconSrc: privacyUnlockIcon,
                                stateFor: 'privacyStatus',
                            }}
                        />
                    </>
                ) : (
                    <>
                        <HeaderStatusToggleIcons
                            state={{
                                isEnabled: phone ? phone.status : false,
                                onIconSrc: videoCallOnIcon,
                                offIconSrc: videoCallOffIcon,
                                stateFor: 'phoneApplication',
                            }}
                        />
                        <HeaderStatusToggleIcons
                            state={{
                                isEnabled: phoneRingerApplication ? phoneRingerApplication.status : false,
                                onIconSrc: phoneRingerOnIcon,
                                offIconSrc: phoneRingerOffIcon,
                                stateFor: 'phoneRinger',
                            }}
                        />
                    </>
                )}
            </Grid>
        </Grid>
    );
}

export default Header;
