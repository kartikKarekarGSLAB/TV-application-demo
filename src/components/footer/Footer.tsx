import { Grid } from '@mui/material';
import '../../assets/styles/Footer.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import Image from './../common-components/image/Image';
import LocationDetailsContainer from './../common-components/location/LocationDetailsContainer';
import DeviceSerialNumber from './../common-components/location/DeviceSerialNumber';
import PhoneDetails from './../common-components/phone-details/PhoneDetails';
import StaffDetails from './../common-components/staff-details/StaffDetails';
import { appConfigTV } from '../../config/appConfigTV';
import { formatPhoneNumber } from '../../common/applicationUtil';

function Footer() {
    const { locationResponse, imageUrls, patientProfile } = useSelector((state: RootState) => state.app);
    const { locationDetail } = locationResponse;
    const footerCopyrightIcon = imageUrls[appConfigTV.nuxeoImageTags.footerLogo];
    let showFooter = true;
    let showLocation = false;
    let patientPreferences = null;

    // Used to display the location information
    let patientDisplayName = '';
    let departmentName = '';
    let locationDisplayName = '';
    // User to display the phone number.
    // TODO :: setting the flag need to be updated.
    let showPhoneNumber = false; // TODO :: set this flag as false initially.
    let phoneNumber = ''; // TODO :: set this value as blank initially.
    const isPhoneNumberRegistered = true;
    // Use to display the device serial number.
    let showDeviceSerialNumber = false;
    let deviceNumber = '';
    // Used to display the staff details.
    let showPrimaryDoctor = false;
    let primaryDoctorName = '';
    let primaryDoctorImagSrc = '';
    let showPrimaryNurse = false;
    let primaryNurseName = '';
    let primaryNurseImagSrc = '';

    // Show the location details.
    if (locationDetail) {
        // Set patient name, department name & room display name.
        if (locationDetail.displayName) {
            locationDisplayName = locationDetail.displayName;
        } else if (locationDetail.roomDescription) {
            locationDisplayName = locationDetail.roomDescription;
        }

        if (locationDisplayName || (locationDetail.department && locationDetail.department.departmentName)) {
            showLocation = true;
            if (locationDetail.department && locationDetail.department.departmentName) {
                departmentName = locationDetail.department.departmentName;
            }
        }

        // Set the phone number details.
        if (locationDetail.policy && locationDetail.policy.sipPhoneNumber) {
            showPhoneNumber = true;
            phoneNumber = formatPhoneNumber(locationDetail.policy.sipPhoneNumber);
        }

        if (patientProfile && patientProfile.patientHasPreferences) {
            patientPreferences = patientProfile.patientHasPreferences;
            // Check weather the footer need to be displayed for not.
            if (patientPreferences.showFooter && !patientPreferences.showFooter) {
                showFooter = false;
            }

            if (patientProfile.type == 'device' && patientProfile.deviceNum) {
                deviceNumber = patientProfile.deviceNum;
                showDeviceSerialNumber = true;
            }

            if (
                (patientProfile.preferredAlias && patientProfile.preferredAlias.displayName) ||
                (patientProfile.patientName && patientProfile.patientName.firstName)
            ) {
                // TODO :: set the display name for patient here, add the check based in the available display format and then display the name.
                patientDisplayName =
                    patientProfile.preferredAlias.displayName ||
                    (patientPreferences.nameDisplayFormat != 'DO_NOT_DISPLAY' &&
                        patientProfile.patientName.firstName) ||
                    '';
            }
            // Set the display details for Primary Doctor.
            if (patientProfile.primaryDoctorDisplayName) {
                showPrimaryDoctor = true;
                primaryDoctorImagSrc = patientProfile.primaryDoctorImageUrl ? patientProfile.primaryDoctorImageUrl : '';
                primaryDoctorName = patientProfile.primaryDoctorDisplayName;
            }
            // Set the display details for Primary Nurse.
            if (patientProfile.primaryNurseDisplayName) {
                showPrimaryNurse = true;
                primaryNurseImagSrc = patientProfile.primaryNurseImageUrl ? patientProfile.primaryNurseImageUrl : '';
                primaryNurseName = patientProfile.primaryNurseDisplayName;
            }
        }
    } else {
        showLocation = false;
        console.info('Footer :: No location details available for display in the TV application');
    }

    return (
        <Grid
            container
            className="footer"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '1vh',
                paddingBottom: '1vh',
                mt: { xs: 3, sm: 3, md: 4, lg: 0, xl: 0 },
            }}
        >
            {showFooter && (
                <>
                    {showLocation && (
                        <Grid item xs={3}>
                            <LocationDetailsContainer
                                locationDetails={{
                                    patientDisplayName: patientDisplayName,
                                    department: departmentName,
                                    locationDisplayName: locationDisplayName,
                                }}
                            />
                        </Grid>
                    )}
                    <Grid
                        item
                        xs={7}
                        className="footer-middle-information"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        {/* Show Phone Number */}
                        {showPhoneNumber && (
                            <PhoneDetails
                                phoneNumberDetails={{
                                    isRegistered: isPhoneNumberRegistered,
                                    contact_number: phoneNumber,
                                }}
                            />
                        )}
                        {/* Show Primary Doctor */}
                        {showPrimaryDoctor && (
                            <StaffDetails staffDetails={{ staffImg: primaryDoctorImagSrc, name: primaryDoctorName }} />
                        )}
                        {/* Show Primary Nurse */}
                        {showPrimaryNurse && (
                            <StaffDetails staffDetails={{ staffImg: primaryNurseImagSrc, name: primaryNurseName }} />
                        )}
                        {/* Device Serial Number */}
                        <DeviceSerialNumber
                            deviceSerialNumberDetails={{
                                showDeviceSerialNumber: showDeviceSerialNumber,
                                serialNumber: deviceNumber,
                                deviceIconImage: '',
                            }}
                        ></DeviceSerialNumber>
                    </Grid>
                </>
            )}
            <Grid
                item
                xs={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'flex-end',
                }}
            >
                <Image src={footerCopyrightIcon} alt="footer-copyright" classes="footer-copyright-icon" defaultSrc="" />
            </Grid>
        </Grid>
    );
}

export default Footer;
