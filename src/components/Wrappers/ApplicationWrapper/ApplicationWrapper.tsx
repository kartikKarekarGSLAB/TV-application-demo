import './../../../assets/styles/ApplicationWrapper.scss';
import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { themeConfigurations, generateThemeConfigurations } from './../../../theme/configurations';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './../../../reducers/rootReducer';
import { APPLICATION_PREFERENCE } from './../../../types/appTypes';

function ApplicationWrapper(props: any) {
    // Get the value from the root state.
    const { applicationPreference } = useSelector((state: RootState) => state.app);
    // Generate the theme configurations using the initial theme config and default font size.
    const theme = generateThemeConfigurations(themeConfigurations, APPLICATION_PREFERENCE.fontSize);
    const [applicationThemeConfig, setApplicationThemeConfig] = useState(theme);
    useEffect(() => {
        // If the font preference is updated then reinitialize the theme config and applicationThemeConfig.
        const fontSize = (applicationPreference && applicationPreference.fontSize) || APPLICATION_PREFERENCE.fontSize;
        const changedThemConfig = generateThemeConfigurations(themeConfigurations, fontSize);
        setApplicationThemeConfig(changedThemConfig);
    }, [applicationPreference]);
    return (
        <ThemeProvider theme={applicationThemeConfig}>
            <Grid
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // TODO :: Removed this padding for trial of video library.
                    padding: '0px 0vw',
                    minHeight: '100vh',
                    maxHeight: '100vh',
                    overflow: 'hidden',
                }}
                className="Main"
            >
                {props.children}
            </Grid>
        </ThemeProvider>
    );
}

export default ApplicationWrapper;
