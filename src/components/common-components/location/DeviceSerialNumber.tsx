import { Box, Tooltip, Typography } from '@mui/material';
import '../../../assets/styles/common/common-components/location/DeviceSerialNumber.scss';
// TODO : location to be added from image library.
import locationImage from '../../../assets/images/footer/footer-room.png';
import Image from './../image/Image';

function DeviceSerialNumber({
    deviceSerialNumberDetails,
}: {
    deviceSerialNumberDetails: { showDeviceSerialNumber: boolean; serialNumber: string; deviceIconImage: string };
}) {
    return deviceSerialNumberDetails.showDeviceSerialNumber ? (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                ml: 3,
            }}
        >
            <Box className="device-serial-number-icon" sx={{ alignSelf: 'center' }}>
                {/* TODO:: Add the device image icon here. */}
                {/* <Image src={deviceSerialNumberDetails.deviceIconImage} alt="phone-details-icon" defaultSrc="" /> */}
                <Image src={locationImage} alt="location-details" classes="device-serial-number-icon" defaultSrc="" />
            </Box>
            <Box className="device-serial-number" sx={{ alignSelf: 'center' }}>
                <Tooltip title={deviceSerialNumberDetails.serialNumber}>
                    <Typography variant="body2">{deviceSerialNumberDetails.serialNumber}</Typography>
                </Tooltip>
            </Box>
        </Box>
    ) : (
        <></>
    );
}

export default DeviceSerialNumber;
