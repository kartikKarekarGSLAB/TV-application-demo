import { Box, Tooltip, Typography } from '@mui/material';
import '../../../assets/styles/common/common-components/location/LocationDetailsContainer.scss';
// TODO : location to be added from image library.
import locationImage from '../../../assets/images/footer/footer-room.png';
import Image from './../image/Image';

function LocationDetailsContainer({
    locationDetails,
}: {
    locationDetails: { patientDisplayName: string; department: string; locationDisplayName: string };
}) {
    return (
        <>
            <Box
                className="patient-room"
                sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    mr: 5,
                }}
            >
                <Image src={locationImage} alt="location-details" classes="patient-room-image" defaultSrc="" />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '70%',
                    }}
                >
                    {locationDetails.patientDisplayName.length > 0 && (
                        <div className="patient-room-details">
                            <Tooltip title={locationDetails.patientDisplayName}>
                                <Typography variant="body2">{locationDetails.patientDisplayName}</Typography>
                            </Tooltip>
                        </div>
                    )}
                    <div className="patient-room-details">
                        <Tooltip title={locationDetails.locationDisplayName}>
                            <Typography variant="body2">{locationDetails.locationDisplayName}</Typography>
                        </Tooltip>
                    </div>
                    <div className="patient-room-details">
                        <Tooltip title={locationDetails.department}>
                            <Typography variant="body2">{locationDetails.department}</Typography>
                        </Tooltip>
                    </div>
                </Box>
            </Box>
        </>
    );
}

export default LocationDetailsContainer;
