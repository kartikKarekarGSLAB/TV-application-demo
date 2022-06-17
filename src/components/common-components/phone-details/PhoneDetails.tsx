import { Box, Tooltip, Typography } from '@mui/material';
import '../../../assets/styles/common/common-components/phone-details/PhoneDetails.scss';
import Phone from '../../../assets/images/footer/phone.png';
import NoPhone from '../../../assets/images/footer/phone.png';
import Image from './../image/Image';

function PhoneDetails({
    phoneNumberDetails,
}: {
    phoneNumberDetails: { isRegistered: boolean; contact_number: string };
}) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
            }}
        >
            <Box sx={{ alignSelf: 'center' }}>
                <Image
                    classes="phone-details-icon"
                    src={phoneNumberDetails.isRegistered ? Phone : NoPhone}
                    alt="phone-details-icon"
                    defaultSrc=""
                />
            </Box>
            <Box className="phone-details-number" sx={{ alignSelf: 'center' }}>
                <Tooltip title={phoneNumberDetails.contact_number}>
                    <Typography variant="body2">{phoneNumberDetails.contact_number}</Typography>
                </Tooltip>
            </Box>
        </Box>
    );
}

export default PhoneDetails;
