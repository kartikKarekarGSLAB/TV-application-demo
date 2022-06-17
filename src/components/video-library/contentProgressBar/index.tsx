import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './../../../assets/styles/common/common-components/video-library/contentProgressBar/ContentProgressBar.scss';

/**
 * This is the functional component used for generate the progress bar along with
 * progress completion percentage.
 * @param props configuration instance needed for the video progress bar indicator.
 * @returns function component with progress bar and progress complete percentage label.
 */
function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number; showProgressPercentage: boolean; progressBarStyling: string },
) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress className={props.progressBarStyling} variant="determinate" {...props} />
            </Box>
            {props.showProgressPercentage ? (
                <Box sx={{ minWidth: 35, marginLeft: 1 }}>
                    <Typography variant="body2">{`${Math.round(props.value)}%`}</Typography>
                </Box>
            ) : (
                ''
            )}
        </Box>
    );
}

/**
 * @interface ContentProgressBarProperties this interface used to represent the
 * content progress bar.
 * @property progressComplete {string} number of video completed.
 */
interface ContentProgressBarProperties {
    wrapperStyleClass?: string;
    progressBarStyleClass?: string;
    showProgressPercentage?: boolean;
    progressComplete: number;
}

/**
 * This is the functional component used to generate the content progress bar.
 * @param param0 {ContentProgressBarProperties}
 * @returns component with progress information.
 */
function ContentProgressBar({
    progressComplete = 0,
    wrapperStyleClass = '',
    progressBarStyleClass = '',
    showProgressPercentage = false,
}: ContentProgressBarProperties) {
    return (
        <Box className={wrapperStyleClass} sx={{ width: '100%' }}>
            <LinearProgressWithLabel
                value={progressComplete}
                showProgressPercentage={showProgressPercentage}
                progressBarStyling={progressBarStyleClass}
            />
        </Box>
    );
}

export { ContentProgressBar };
