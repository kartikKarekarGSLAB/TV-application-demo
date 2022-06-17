import { Box, Tooltip, Typography } from '@mui/material';
import '../../../assets/styles/common/common-components/staff-details/StaffDetails.scss';
import Image from './../image/Image';

function StaffDetails({ staffDetails }: { staffDetails: { staffImg: any; name: string } }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'flex-start',
            }}
        >
            <Box sx={{ alignSelf: 'center', ml: 3 }}>
                <Image classes="staff-details-avatar" src={staffDetails.staffImg} alt="assigned-staff" defaultSrc="" />
            </Box>
            <Box
                className="staff-details-name"
                sx={{
                    alignSelf: 'center',
                    textOverflow: 'ellipsis',
                    ml: 2,
                }}
            >
                <Tooltip title={staffDetails.name}>
                    <Typography variant="body2">{staffDetails.name}</Typography>
                </Tooltip>
            </Box>
        </Box>
    );
}

export default StaffDetails;
