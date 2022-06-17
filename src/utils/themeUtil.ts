import { ThemeConfiguration } from '../types/appTypes';

/**
 * This function will apply the theme configuration objects attributes added as the custom CSS
 * properties, later in the application those properties can be referred using the --var() function.
 * while loading the configurations from server if any configuration property is missing,
 * then it load the value from default configuration value.
 * - please consider the following when applying those configurations.
 * - https://developer.mozilla.org/en-US/docs/Web/CSS/var()
 * @param themeConfigurations theme configuration object
 */
export const applyThemeConfigurations = (themeConfigurations: ThemeConfiguration) => {
    if (themeConfigurations && Object.values(themeConfigurations).length > 0) {
        // Looping over the default configuration ensure all the required values are available.
        for (const configureValue in themeConfigurations) {
            // Assign value from them configuration.
            const value = themeConfigurations[configureValue];
            // TODO:: once we get the any property specific to image,
            // Needed to add image URL in the same.
            // Set the value as CSS custom variable.
            document.documentElement.style.setProperty(`--${configureValue}`, value, 'important');
        }
    }
};
