import '../../../assets/styles/PageTitle.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from '@mui/material';

function PageTitle(props: any) {
    const { showArrow, headerText, navigateBack } = props;
    return (
        <div className="page-heading">
            <ArrowBackIcon
                className="back-icon"
                style={{ visibility: showArrow ? 'visible' : 'hidden' }}
                onClick={() => navigateBack()}
            />
            <div className="header-text">
                <Typography variant="subtitle1">{headerText}</Typography>
            </div>
        </div>
    );
}

export default PageTitle;
