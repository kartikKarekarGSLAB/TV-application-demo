import { Box, Tooltip, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import '../../assets/styles/Header.scss';
import { Weather } from '../../types/appTypes';
import Image from './../common-components/image/Image';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

function HeaderInformationContainer({ weather }: { weather: Weather }) {
    dayjs.extend(customParseFormat);
    const { conditions, geo, temp, tempUnit } = weather;
    let weatherIcon = '';
    // TODO: consider this format will come from the locale response.
    // to support the localization.
    const DATE_TIME_FORMAT = 'hh:mm:ss A ddd, MMM DD';
    const [headerInformationData, setHeaderInformation] = useState({ dateTimeValue: dayjs().format(DATE_TIME_FORMAT) });
    useEffect(() => {
        const interval = setInterval(() => {
            setHeaderInformation({
                ...headerInformationData,
                dateTimeValue: dayjs().format(DATE_TIME_FORMAT),
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    if (conditions) {
        weatherIcon = conditions[0].vendorImageUrl;
    }

    return (
        <Box className="header-weather-location-panel">
            <Box className="header-location">
                <Tooltip title={(geo && geo.city + ', ' + geo.region) || ''}>
                    <Typography variant="subtitle1">{(geo && geo.city + ', ' + geo.region) || ''}</Typography>
                </Tooltip>
            </Box>
            <Box className="header-information">
                <Tooltip title={headerInformationData.dateTimeValue}>
                    <Typography variant="subtitle1" className="header-date-time">
                        {headerInformationData.dateTimeValue}
                    </Typography>
                </Tooltip>
                <span className="header-weather">
                    <Tooltip title={(temp && tempUnit && temp + ' \xB0' + tempUnit) || ''}>
                        <Typography className="weather-temp" variant="subtitle1">
                            {(temp && tempUnit && temp + ' \xB0' + tempUnit) || ''}
                        </Typography>
                    </Tooltip>
                    <Image src={weatherIcon} alt="weather_status" classes="icon" defaultSrc="" />
                </span>
            </Box>
        </Box>
    );
}

export default HeaderInformationContainer;
