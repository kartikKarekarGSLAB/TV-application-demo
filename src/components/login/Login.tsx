import InputField, { InputFieldProperties } from '../common-components/input-field/InputField';
import { config } from '../../config/config';
import React, { FunctionComponent, useState, useEffect, useRef, ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { LoginFormat, LocationByToken } from '../../utils/loginUtil';
import '../../assets/styles/Login.scss';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Button } from '@mui/material';
import { axiosInstance } from '../../utils/axiosUtil';
import { getOAuthToken, GetOAuthInput } from '../../services/OAuthService';
import { PATIENT_ROOM, HOME_SCREEN_PATH_NAME } from '../../utils/commonConst';
import { setUserIsAuthorized, setLoginLogoutButtonType, setDeviceNumberAndTenantId } from '../../actions/loginAction';
import {
    getImgListRequest,
    getAppListRequest,
    getProfileRequest,
    getExtAppsRequest,
    getLocationBySerialNumberSuccess,
} from '../../actions/appActions';
import { appConfigTV } from '../../config/appConfigTV';
import Image from '../common-components/image/Image';
import VirtualKeyboardModal from '../common-components/keyboard/modal/VirtualKeyboardModal';

const ROOM_FIELD_NAME = 'room';
const BED_FIELD_NAME = 'bed';
const DEPARTMENT_FIELD_NAME = 'dept';
const PASSWORD_FIELD_NAME = 'pwd';

/**
 * This is the functional component used to create the login page.
 * This will generate the API call for getting login format and then generate the login form according.
 *
 * @returns {component} login form component.
 */
const LogIn: FunctionComponent = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { search } = useLocation();
    const navigate = useNavigate();
    const { urlQueryParameters } = useSelector((state: RootState) => state.login);
    const { locationResponse, imageUrls } = useSelector((state: RootState) => state.app);
    const { locationDetail, locationStatus } = locationResponse;
    const [loginState, setLoginState] = useState({
        loginFields: [] as string[],
        errMessage: '',
        currentKeyboardFocusField: '',
    });
    // This will store the login details needed.
    const [loginForm, setLoginForm] = useState({
        room: '',
        bed: '',
        dept: '',
        pwd: '',
    });
    /**
     * The virtual keyboard getting opened for the any input field.
     * To identify the input element associated along with the keyboard,
     * We needed to identify the inputFieldName, InputFileType and inputFiledValue.
     */
    const [inputFieldName, setInputFieldName] = useState('default');
    const [inputFieldLabel, setInputFieldLabel] = useState('');
    const [inputFieldType, setInputFieldType] = useState('');
    const [inputFieldValue, setInputFieldValue] = useState('');
    // References will be needed to set the focus away from the input field.
    const roomInputElementReference: any = useRef(null);
    const bedInputElementReference: any = useRef(null);
    const deptInputElementReference: any = useRef(null);
    const pwdInputElementReference: any = useRef(null);
    // This is used to set logo url
    const [logoURL, setLogoURL] = useState('');
    // This is used to defined the state of the virtual keyboard
    const [keyboardModalOpenState, setKeyboardModalOpenState] = useState(false);

    /**
     * This function will be callback when the keyboard component Modal.
     * Get closed.
     */
    const handleKeyboardModalCloseCallback = () => {
        setKeyboardModalOpenState(false);
        // Hide the virtual keyboard help here.
        setLoginState({
            ...loginState,
            currentKeyboardFocusField: '',
        });
    };

    useEffect(() => {
        setLoginForm({
            ...loginForm,
            room: (locationDetail && locationDetail.room) || '',
            bed: (locationDetail && locationDetail.bed) || '',
            dept: (locationDetail && locationDetail.department && locationDetail.department.departmentId) || '',
        });
    }, [locationDetail]);

    useEffect(() => {
        getLoginFormat();
    }, []);

    useEffect(() => {
        setLogoURL(imageUrls && imageUrls[appConfigTV.nuxeoImageTags.headerLogo]);
    }, [imageUrls]);

    /**
     * This function make an API call to get
     * login form input's field
     */
    const getLoginFormat = (): void => {
        axiosInstance
            .get<LoginFormat>(config.URL.MES_BASE_PATH() + config.URL.LOGIN_FIELDS())
            .then((res) => {
                if (res.status == 200 && res.data && res.data.payload.locationIdFormatKeys) {
                    setLoginState({
                        ...loginState,
                        loginFields: res.data.payload.locationIdFormatKeys.concat(['pwd']),
                    });
                } else {
                    setLoginState({
                        ...loginState,
                        loginFields: [],
                    });
                }
            })
            .catch((err: any) => {
                console.error('Login.tsx :: getLoginFormat function failuer', err);
                setLoginState({
                    ...loginState,
                    loginFields: [],
                });
            });
    };

    /**
     * This function call the location by token api
     * to get the location details.
     */
    const getLocationByToken = () => {
        axiosInstance
            .get<LocationByToken>(config.URL.MES_BASE_PATH() + config.URL.LOCATIONS_BY_TOKEN())
            .then((res) => {
                console.log(res);
                if (res && res.status == 200 && res.data && res.data.payload && res.data.status) {
                    const { payload, status } = res.data;
                    dispatch(
                        setDeviceNumberAndTenantId({
                            deviceNumber: payload.device && payload.device.serialNumber,
                            tenantId: urlQueryParameters && urlQueryParameters.tenantId,
                        }),
                    );
                    dispatch(
                        getLocationBySerialNumberSuccess({
                            locationDetail: payload,
                            locationStatus: status,
                        }),
                    );
                    onLoginSuccessNavigateToHome();
                } else {
                    console.log('Login.tsx :: getLocationByToken :: response is', res);
                    setLoginState({
                        ...loginState,
                        errMessage: 'Location Not Found',
                    });
                }
            })
            .catch((error: any) => {
                console.error('Login.tsx :: getLocationByToken :: returns an error', error);
                setLoginState({
                    ...loginState,
                    errMessage: 'Location Not Found',
                });
            });
    };

    /**
     * This function is used to handel
     * on change event of input filed's
     * This function help us to generate input
     * field dynamically for login form, depending
     * on response of getLoginFormat API call
     */
    const generateLoginForm = (): any => {
        if (loginState.loginFields && loginState.loginFields.length > 0) {
            return loginState.loginFields.map((field, i) => {
                const fieldListData: InputFieldProperties = {
                    inputType: 'text',
                    inputValue: '',
                    placeholder: '',
                    styleClass: ' login-input-field ',
                    isDisabled: true,
                    onChangeCallback: inputElementOnChangeCallback,
                    onFocusCallback: inputElementOnFocusCallback,
                    onKeyUpCallback: inputElementOnKeyUpCallback,
                };
                switch (field) {
                    case ROOM_FIELD_NAME:
                        fieldListData.inputReference = roomInputElementReference;
                        fieldListData.inputValue = getInputFieldValue(ROOM_FIELD_NAME) || '';
                        fieldListData.placeholder = t('common_room_label');
                        fieldListData.formField = ROOM_FIELD_NAME;
                        fieldListData.isDisabled = locationDetail && locationDetail.room ? true : false;
                        break;
                    case BED_FIELD_NAME:
                        fieldListData.inputReference = bedInputElementReference;
                        fieldListData.inputValue = getInputFieldValue(BED_FIELD_NAME) || '';
                        fieldListData.placeholder = t('coomon_bed_label');
                        fieldListData.formField = BED_FIELD_NAME;
                        fieldListData.isDisabled = locationDetail && locationDetail.bed ? true : false;
                        break;
                    case DEPARTMENT_FIELD_NAME:
                        fieldListData.inputReference = deptInputElementReference;
                        fieldListData.inputValue = getInputFieldValue(DEPARTMENT_FIELD_NAME) || '';
                        fieldListData.placeholder = t('login_department_label');
                        fieldListData.formField = DEPARTMENT_FIELD_NAME;
                        fieldListData.isDisabled =
                            locationDetail && locationDetail.department && locationDetail.department.departmentName
                                ? true
                                : false;
                        break;
                    case PASSWORD_FIELD_NAME:
                        fieldListData.inputReference = pwdInputElementReference;
                        fieldListData.inputValue = getInputFieldValue(PASSWORD_FIELD_NAME) || '';
                        fieldListData.placeholder = t('common_password_label');
                        fieldListData.inputType = 'password';
                        fieldListData.formField = PASSWORD_FIELD_NAME;
                        fieldListData.isDisabled = false;
                        break;
                    default:
                        console.error('LogIn : generateLoginForm : invalid input field type.');
                        break;
                }
                if (fieldListData && fieldListData.placeholder && fieldListData.placeholder.length > 0) {
                    return (
                        <React.Fragment key={i}>
                            <Grid item xs={4} className="login-input-label">
                                <Typography variant="h4">{fieldListData?.placeholder}</Typography>
                            </Grid>
                            <Grid item xs={8} className="login-field-spacing">
                                <InputField fieldProperties={fieldListData} />
                            </Grid>
                        </React.Fragment>
                    );
                }
            });
        }
        console.error('LogIn : generateLoginForm : input fields are empty so no input elements are generated.');
        return '';
    };

    /**
     * This will be the callback function when the input field is changed.
     * @param loginFormFieldName {string} this will represent the form field name.
     * @param event {object} event object getting populated when the input field value getting changed.
     */
    const inputElementOnChangeCallback = (loginFormFieldName: string, event: ChangeEvent<HTMLInputElement>): void => {
        // 1. Get the value from the keyboard.
        const updatedInputFieldValue: string = event.target.value;
        console.log(
            'LogIn : handleChange field value updated loginFormFieldName= ',
            loginFormFieldName,
            ', value=',
            updatedInputFieldValue,
        );
        // 2. Set the input in current state.
        setLoginForm({
            ...loginForm,
            [loginFormFieldName]: updatedInputFieldValue || '',
        });
    };

    /**
     * This will be the callback function when the input field is changed.
     * @param loginFormFieldName {string} this will represent the form field name.
     * @param event {object} event object getting populated when the input field value getting changed.
     */
    const inputElementOnKeyUpCallback = (loginFormFieldName: string, event: ChangeEvent<HTMLInputElement>): void => {
        // 1. Id of field getting updated.
        const updatedInputFieldId: string = event.target.id;
        console.log(
            'LogIn : inputElementOnKeyUpCallback field value updated, updatedInputFieldId= ',
            updatedInputFieldId,
            ', loginFormFieldName=',
            loginFormFieldName,
        );
    };

    /**
     * This function will be callback for the keyboard modal. this will get execute when the keyboard input value getting updated.
     * @param loginFormFieldName {string} input field name/id for which the keyboard component updating the input value.
     * @param updatedInputFieldValue {string} updated input field value.
     */
    const onChangeUpdateBindInputElementValueCallback = (
        loginFormFieldName: string,
        updatedInputFieldValue: string,
    ) => {
        console.log(
            'LogIn : onChangeUpdateBindInputElementValueCallback : Updating the loginFormFieldName=',
            loginFormFieldName,
            ', with value =',
            updatedInputFieldValue,
        );
        // Set the value of respective element in the loginForm state value.
        setLoginForm({
            ...loginForm,
            [loginFormFieldName]: updatedInputFieldValue || '',
        });
        setInputFieldValue(updatedInputFieldValue);
    };

    /**
     * This function will set the input element details for the keyboard.
     * This will show the keyboard, bind the input element for the keyboard.
     * It will also load the label into keyboard panel. It also make the input
     * element focus blurred.
     * @param event {ChangeEvent}
     */
    const virtualKeyboardOpenCallback = (event: ChangeEvent<HTMLInputElement>): void => {
        setInputFieldName(event.target.id);
        setInputFieldType(event.target.type);
        setInputFieldValue(event.target.value);
        // This will open the keyboard modal.
        setKeyboardModalOpenState(true);
        // TODO : Later once we have pillow speaker integration
        // ready then we can eliminate this part of code.
        switch (event.target.id) {
            case ROOM_FIELD_NAME:
                setInputFieldLabel(t('common_room_label'));
                if (roomInputElementReference && roomInputElementReference.current) {
                    roomInputElementReference.current.blur();
                }
                break;
            case BED_FIELD_NAME:
                setInputFieldLabel(t('coomon_bed_label'));
                if (bedInputElementReference && bedInputElementReference.current) {
                    bedInputElementReference.current.blur();
                }
                break;
            case DEPARTMENT_FIELD_NAME:
                setInputFieldLabel(t('login_department_label'));
                if (deptInputElementReference && deptInputElementReference.current) {
                    deptInputElementReference.current.blur();
                }
                break;
            case PASSWORD_FIELD_NAME:
                setInputFieldLabel(t('common_password_label'));
                if (pwdInputElementReference && pwdInputElementReference.current) {
                    pwdInputElementReference.current.blur();
                }
                break;
            default:
                console.error('LogIn : inputElementOnFocusCallback : invalid input field type.');
                break;
        }
    };

    /**
     * This function will get triggered when, we the input element will get focus.
     * It will set the keyboardFieldName, that will update the inputName property of virtual keyboard.
     * @param loginFormFieldName {string} this will represent the form field name.
     * @param event {object} event object getting populated when the input field value getting changed.
     */
    const inputElementOnFocusCallback = (loginFormFieldName: string, event: ChangeEvent<HTMLInputElement>): void => {
        console.log(
            'LogIn : inputElementOnFocusCallback : Getting focus in the field :: ',
            event.target.id,
            ', fieldName=',
            loginFormFieldName,
        );
        // Set the input element name for the info message.
        setLoginState({
            ...loginState,
            currentKeyboardFocusField: 'Press "OK" on Pillow Speaker to enter ' + loginFormFieldName || '',
        });
        // TODO : currently added the virtual keyboard open on focus.
        // Later once we have pillow speaker integration
        // ready then we can eliminate this part of code.
        virtualKeyboardOpenCallback(event);
    };

    /**
     * This function is bind with on click event
     * of submit button also this function make an API
     * call to generate OAuth token.
     * After successfully getting token it will call "getLocationByToken"
     * if location details not available.
     */
    const submitLoginForm = () => {
        let isAllFields = false;
        for (let index = 0; index < loginState.loginFields.length; index++) {
            const field = loginState.loginFields[index];
            const val = loginForm[field as keyof typeof loginForm];
            if (val && val.trim().length > 0) {
                isAllFields = true;
            } else {
                isAllFields = false;
                break;
            }
        }
        const { pwd, room, bed } = loginForm;
        if (isAllFields) {
            const oAuthInputObj: GetOAuthInput = {
                appMode: 'patient',
                grantType: 'password',
                userName: `${room}_${bed}` || '',
                password: pwd,
                storeInLocal: true,
            };
            getOAuthToken(oAuthInputObj).then((obj) => {
                if (obj.tokenSuccess) {
                    if (locationStatus && locationStatus.statusCode == 200) {
                        onLoginSuccessNavigateToHome();
                    } else if (locationStatus && locationStatus.statusCode != 200) {
                        getLocationByToken();
                    } else {
                        console.error('Login.tsx :: submitLoginForm :: location status is', locationStatus);
                        setLoginState({
                            ...loginState,
                            errMessage: 'Location Not Found',
                        });
                    }
                } else {
                    const { statusCode } = obj;
                    if (statusCode == 400 || statusCode == 401) {
                        setLoginState({
                            ...loginState,
                            errMessage: 'Invalid credentials, please try again.',
                        });
                    } else if (statusCode == 500) {
                        setLoginState({
                            ...loginState,
                            errMessage: 'Login failed due to system error.',
                        });
                    } else {
                        setLoginState({
                            ...loginState,
                            errMessage: t('login_failed_login_error_msg'),
                        });
                    }
                }
            });
        } else {
            setLoginState({
                ...loginState,
                errMessage: t('login_required_fields_not_entered_msg'),
            });
        }
    };

    /**
     * This function will dispatch bunch of actions
     * once the login is successfully and navigate to
     * HOME screen
     */
    const onLoginSuccessNavigateToHome = () => {
        dispatch(getAppListRequest(PATIENT_ROOM));
        dispatch(getProfileRequest());
        dispatch(setUserIsAuthorized(true));
        dispatch(setLoginLogoutButtonType('logout'));
        dispatch(getImgListRequest());
        dispatch(getExtAppsRequest());
        navigate({
            pathname: `/${HOME_SCREEN_PATH_NAME}`,
            search: search,
        });
    };

    /**
     * This function bind with cancel button event of login form.
     * It is also responsible for HOME screen navigation.
     */
    const onCancelClick = () => {
        dispatch(setUserIsAuthorized(true));
        dispatch(setLoginLogoutButtonType('login'));
        navigate({
            pathname: `/${HOME_SCREEN_PATH_NAME}`,
            search: search,
        });
    };

    /* This function will return the value from inputs.
     * @param inputFieldName input field name from the login form state value.
     * @returns {string} value of the inputFileName from the login form state.
     */
    const getInputFieldValue = (inputFieldName: any): string => {
        switch (inputFieldName) {
            case ROOM_FIELD_NAME:
                return loginForm.room;
            case BED_FIELD_NAME:
                return loginForm.bed;
            case DEPARTMENT_FIELD_NAME:
                return loginForm.dept;
            case PASSWORD_FIELD_NAME:
                return loginForm.pwd;
            default:
                console.error('LoginIn : getInputFieldValue: invalid fieldName passed, fieldName=', inputFieldName);
        }
        return '';
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Grid container>
                    <Grid item xs={2} />
                    <Grid item xs={7}>
                        <Grid container sx={{ marginTop: '13vh' }}>
                            <Image src={logoURL} classes="login-logo" alt="hospital-logo" defaultSrc="" />
                        </Grid>
                    </Grid>
                    <Grid item xs={3} />
                    {generateLoginForm()}
                    <Grid item xs={4} className="login-input-label">
                        <Typography variant="h4"></Typography>
                    </Grid>
                    <Grid item xs={5.4} className="login-field-spacing">
                        {loginState.loginFields.length > 0 && (
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button
                                        variant="contained"
                                        className="cancel-button"
                                        fullWidth
                                        onClick={onCancelClick}
                                    >
                                        <Typography variant="button">Cancel</Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        className="login-button"
                                        variant="contained"
                                        fullWidth
                                        onClick={submitLoginForm}
                                    >
                                        <Typography variant="button">Login</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item xs={2.6} />
                    <Grid item xs={2} />
                    {/* Login Page Error Messages. */}
                    <Grid item xs={12} sx={{ alignContent: 'flex-end' }}>
                        <Typography variant="body1" className="login-form-err">
                            {loginState.errMessage}
                        </Typography>
                    </Grid>
                    {/* Login Page Input Element Virtual Keyboard Tooltip. */}
                    <Grid item xs={12} sx={{ alignContent: 'flex-end' }}>
                        <Typography variant="body1" className="login-input-element-help">
                            {loginState.currentKeyboardFocusField}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6} sx={{ marginY: 'auto' }}></Grid>
            <VirtualKeyboardModal
                keyboardModalOpenState={keyboardModalOpenState}
                handleKeyboardModalClose={handleKeyboardModalCloseCallback}
                onChangeUpdateBindInputElementValue={onChangeUpdateBindInputElementValueCallback}
                bindInputElementName={inputFieldName}
                bindInputElementLabel={inputFieldLabel}
                bindInputElementType={inputFieldType}
                bindInputElementValue={inputFieldValue}
            />
        </Grid>
    );
};

export default LogIn;
