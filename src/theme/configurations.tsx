import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material/styles';

import { DEFAULT_FONT_SIZE_CATEGORY, STYLE_OVERRIDES, getTypographyForTheme } from './font/constantsUtil';

interface CustomThemeConfigurations extends ThemeOptions {
    breakpoints: any;
    direction: any;
    components: any;
    palette: any;
    spacing: any;
    shape: any;
    mixins: any;
    shadows: any;
    typography: any;
    transitions: any;
    zindex: any;
}

export const themeConfigurations = {
    components: {
        MuiCssBaseline: {
            styleOverrides: STYLE_OVERRIDES,
        },
    },
    typography: getTypographyForTheme(DEFAULT_FONT_SIZE_CATEGORY),
};

/**
 * This file will create the Material UI theme configurations for the application.
 *
 * Please refer the following for theme related configurations.
 *  - https://mui.com/customization/default-theme/ (Default Theme configuration of Material UI)
 * @param themeConfigurations theme configuration with added config values,
 * @param fontSize font size category. it can take value like 'small', 'medium' or 'large', if no value is passed, then it will consider default as DEFAULT_FONT_SIZE_CATEGORY.
 * @returns a theme instance created, with identified configurations based on the font size.
 */
export const generateThemeConfigurations = (
    themeConfigurations: any,
    fontSize: string = DEFAULT_FONT_SIZE_CATEGORY,
) => {
    if (themeConfigurations && themeConfigurations.typography) {
        themeConfigurations.typography = getTypographyForTheme(fontSize);
    }
    let theme = createTheme(themeConfigurations as CustomThemeConfigurations);
    theme = responsiveFontSizes(theme);
    return theme;
};
