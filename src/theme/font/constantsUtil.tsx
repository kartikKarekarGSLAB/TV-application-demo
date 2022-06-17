/**
 * The theme specifies the color of the components, darkness of the surfaces,
 * level of shadow, appropriate opacity of ink elements, etc.
 * Themes let you apply a consistent tone to your app. It allows you to customize all
 * design aspects of your project in order to meet the specific needs of your business or brand.
 *
 * This Constants Util provide a way top set the configurations for Typography section of
 * theme configuration.
 * - https://mui.com/customization/typography/
 *
 * It include the following.
 *
 * 1. Font size category constants.
 * 2. Default font configurations.
 * 3. Supported Variant Names.
 * 4. Variant configurations and font sizes wrt the font category.
 * 5. Font Style Override.
 * @author kartik.karekar@extcare.com
 */

import {
    RESOLUTION_HD,
    RESOLUTION_FULL_HD,
    RESOLUTION_2k,
    RESOLUTION_4k,
    RESOLUTION_HD_MEDIA_QUERY,
    RESOLUTION_4k_MEDIA_QUERY,
    RESOLUTION_2k_MEDIA_QUERY,
    RESOLUTION_FULL_HD_MEDIA_QUERY,
} from './../responsive/constantUtil';

/**
 * 1. Font sizes categories constants.
 * - Currently, we support 3 different font sizes catagories.
 * - 1. small
 * - 2. medium (default)
 * - 3. large
 *
 * Note:: later if we needed to support any different font size
 * we needed to add the font size constant here.
 */
export const FONT_SIZE_SMALL = 'small';
export const FONT_SIZE_MEDIUM = 'medium'; // default font size.
export const FONT_SIZE_LARGE = 'large';

// 2. Default font configurations.
export const DEFAULT_FONT_SIZE = 16;
export const FONT_SIZE = 14; // px
// Tell Material-UI what's the font-size on the html element.
// 16px is the default font-size used by browsers.
export const HTML_FONT_SIZE = 16;
export const COEF = FONT_SIZE / 14;
/**
 * This function will convert the fontsize,
 * to respective font
 */
export const PX_TO_REM = (fontSize: number) => {
    return `${fontSize}rem !important`;
};
export const DEFAULT_FONT_SIZE_CATEGORY = FONT_SIZE_MEDIUM;
export const DEFAULT_FONT_FAMILY = 'CiscoSans, Arial, Helvetica, sans-serif';
export const DEFAULT_FONT_FAMILY_BOLD = 'CiscoSansBold, Arial, Helvetica, sans-serif';
export const DEFAULT_FONT_FAMILY_OBLIQUE = 'CiscoSansBoldOblique, Arial, Helvetica, sans-serif';
export const DEFAULT_FONT_WEIGHT = 400;
export const FONT_WEIGHT_LIGHT = 300;
export const FONT_WEIGHT_REGULAR = 400;
export const FONT_WEIGHT_MEDIUM = 500;
export const FONT_WEIGHT_BOLD = 700;

/**
 * 3. Supported "variant Names.
 * Currently added the variant names which are supported by the material UI Typography
 * Later, if we needed any custom variant we can add the variant name here.
 *  reference - https://mui.com/customization/typography/#variants
 */

/**
 * In the type scale, headlines span from a range of 1 through 6.
 * Headlines are the largest text on the screen, reserved for short,
 * important text or numerals.
 */
export const VARIANT_HEADING_1 = 'h1';
export const VARIANT_HEADING_2 = 'h2';
export const VARIANT_HEADING_3 = 'h3';
export const VARIANT_HEADING_4 = 'h4';
export const VARIANT_HEADING_5 = 'h5';
export const VARIANT_HEADING_6 = 'h6';

/**
 * Subtitles are smaller than headlines.
 * They are typically reserved for medium-emphasis text that is shorter in length.
 */
export const VARIANT_SUBTITLE_1 = 'subtitle1';
export const VARIANT_SUBTITLE_2 = 'subtitle2';

/**
 * Body text comes in ranges 1-2, and it’s typically used for
 * long-form writing as it works well for small text sizes.
 */
export const VARIANT_BODY1 = 'body1';
export const VARIANT_BODY2 = 'body2';

/**
 * Button text is a call to action used by different types
 * of buttons (such as text, outlined and contained buttons)
 * and in tabs, dialogs, and cards.
 */
export const VARIANT_BUTTON = 'button';

/**
 * Caption and overline text (text with a line above it) are the smallest font sizes.
 * They are used sparingly to annotate imagery or to introduce a headline.
 */
export const VARIANT_CAPTION = 'caption';
export const VARIANT_OVERLINE = 'overline';

/**
 * Adding the self hosted fonts.
 * - https://mui.com/customization/typography/#font-family
 * - https://mui.com/customization/typography/#self-hosted-fonts
 */
export const STYLE_OVERRIDES = `
 @font-face {
     font-family: DEFAULT_FONT_FAMILY;
     src: url('./../../assets/styles/fonts/CiscoSans.eot?#iefix') format('embedded-opentype'),
         url('./../../assets/styles/fonts/CiscoSans-Bold.otf') format('opentype'),
         url('./../../assets/styles/fonts/CiscoSans.woff') format('woff'),
         url('./../../assets/styles/fonts/CiscoSans.ttf') format('truetype'),
         url('./../../assets/styles/fonts/CiscoSans.svg#CiscoSans') format('svg');
     font-weight: normal !important;
     font-style: normal !important;
 }
 @font-face {
     font-family: 'CiscoSansBold';
     src: url('./../../assets/styles/fonts/CiscoSans-Bold.eot?#iefix') format('embedded-opentype'),
         url('./../../assets/styles/fonts/CiscoSans-Bold.otf') format('opentype'),
         url('./../../assets/styles/fonts/CiscoSans-Bold.woff') format('woff'),
         url('./../../assets/styles/fonts/CiscoSans-Bold.ttf') format('truetype'),
         url('./../../assets/styles/fonts/CiscoSans-Bold.svg#CiscoSans-Bold') format('svg');
     font-weight: normal !important;
     font-style: normal !important;
 }

 @font-face {
     font-family: 'CiscoSansBoldOblique';
     src: url('./../../assets/styles/fonts/CiscoSans-BoldOblique.eot?#iefix') format('embedded-opentype'),
         url('./../../assets/styles/fonts/CiscoSans-BoldOblique.woff2') format('woff2'),
         url('./../../assets/styles/fonts/CiscoSans-BoldOblique.woff') format('woff'),
         url('./../../assets/styles/fonts/CiscoSans-BoldOblique.ttf') format('truetype'),
         url('./../../assets/styles/fonts/CiscoSans-BoldOblique.svg#CiscoSans-BoldOblique') format('svg');
     font-weight: bold !important;
     font-style: italic !important;
 }    
`;

/**
 * This value represent the variant font configurations.
 * We added all supported variants in the list, each variant associated with the font size
 * wrt the font category size (small, medium, large). We also have responsive support for the application
 * considering that case we added different resolution as breakpoints and added the font size wrt font category.
 *
 * If later we have added any custom variant then we needed to follow the following,
 * - Refer the following :
 * - Add the variant name in the list of variant name.
 * - Add the variant with a font category and supported font size or the same
 * (Keep the responsive behavior in mind while adding the font sizes)
 * - Add the variant in the list
 * - Read more here - https://mui.com/customization/typography/#variants
 *
 * Note :
 * - The font sizes added we needed to verify wrt the view and resolutions.
 * - While adding the values here, it may cause JSON.parse error, so please add values according.
 */
export const VARIANT_FONT_CONFIGURATIONS = JSON.parse(`{
    "${VARIANT_HEADING_1}": {
        "${FONT_SIZE_SMALL}": 3.5,
        "${FONT_SIZE_MEDIUM}": 5,
        "${FONT_SIZE_LARGE}": 6.5,
        "fontWeight": ${FONT_WEIGHT_LIGHT},
        "lineHeight": 1,
        "letterSpacingHeight": 0,
        "resolutions": {
            "${RESOLUTION_HD}": {
                "${FONT_SIZE_SMALL}": 3.5,
                "${FONT_SIZE_MEDIUM}": 5,
                "${FONT_SIZE_LARGE}": 6.5
            },
            "${RESOLUTION_FULL_HD}": {
                "${FONT_SIZE_SMALL}": 3.5,
                "${FONT_SIZE_MEDIUM}": 5,
                "${FONT_SIZE_LARGE}": 6.5
            },
            "${RESOLUTION_2k}": {
                "${FONT_SIZE_SMALL}": 6.5,
                "${FONT_SIZE_MEDIUM}": 8,
                "${FONT_SIZE_LARGE}": 9.5
            },
            "${RESOLUTION_4k}": {
                "${FONT_SIZE_SMALL}": 10.5,
                "${FONT_SIZE_MEDIUM}": 12,
                "${FONT_SIZE_LARGE}": 13.5
            }
        }
    },
    "${VARIANT_HEADING_2}": {
        "${FONT_SIZE_SMALL}": 3,
        "${FONT_SIZE_MEDIUM}": 4.5,
        "${FONT_SIZE_LARGE}": 5.5,
        "fontWeight": ${FONT_WEIGHT_LIGHT},
        "lineHeight": 1,
        "letterSpacingHeight": 0,
        "resolutions": {
            "${RESOLUTION_HD}": {
                "${FONT_SIZE_SMALL}": 3,
                "${FONT_SIZE_MEDIUM}": 4.5,
                "${FONT_SIZE_LARGE}": 5.5
            },
            "${RESOLUTION_FULL_HD}": {
                "${FONT_SIZE_SMALL}": 3,
                "${FONT_SIZE_MEDIUM}": 4.5,
                "${FONT_SIZE_LARGE}": 5.5
            },
            "${RESOLUTION_2k}": {
                "${FONT_SIZE_SMALL}": 6,
                "${FONT_SIZE_MEDIUM}": 7.5,
                "${FONT_SIZE_LARGE}": 8.5
            },
            "${RESOLUTION_4k}": {
                "${FONT_SIZE_SMALL}": 10,
                "${FONT_SIZE_MEDIUM}": 11.5,
                "${FONT_SIZE_LARGE}": 13
            }
        }
    },
    "${VARIANT_HEADING_3}": {
        "${FONT_SIZE_SMALL}": 2,
        "${FONT_SIZE_MEDIUM}": 3.5,
        "${FONT_SIZE_LARGE}": 5,
        "fontWeight": ${FONT_WEIGHT_REGULAR},
        "lineHeight": 1,
        "letterSpacingHeight": 0,
        "resolutions": {
            "${RESOLUTION_HD}": {
                "${FONT_SIZE_SMALL}": 2,
                "${FONT_SIZE_MEDIUM}": 3.5,
                "${FONT_SIZE_LARGE}": 5
            },
            "${RESOLUTION_FULL_HD}": {
                "${FONT_SIZE_SMALL}": 2,
                "${FONT_SIZE_MEDIUM}": 3.5,
                "${FONT_SIZE_LARGE}": 5
            },
            "${RESOLUTION_2k}": {
                "${FONT_SIZE_SMALL}": 5,
                "${FONT_SIZE_MEDIUM}": 6.5,
                "${FONT_SIZE_LARGE}": 8
            },
            "${RESOLUTION_4k}": {
                "${FONT_SIZE_SMALL}": 9,
                "${FONT_SIZE_MEDIUM}": 10.5,
                "${FONT_SIZE_LARGE}": 12
            }
        }
    },
    "${VARIANT_HEADING_4}": {
        "${FONT_SIZE_SMALL}": 1,
        "${FONT_SIZE_MEDIUM}": 2,
        "${FONT_SIZE_LARGE}": 4,
        "fontWeight": ${FONT_WEIGHT_REGULAR},
        "lineHeight": 1,
        "letterSpacingHeight": 0,
        "resolutions": {
            "${RESOLUTION_HD}": {
                "${FONT_SIZE_SMALL}": 1,
                "${FONT_SIZE_MEDIUM}": 2,
                "${FONT_SIZE_LARGE}": 4
            },
            "${RESOLUTION_FULL_HD}": {
                "${FONT_SIZE_SMALL}": 1,
                "${FONT_SIZE_MEDIUM}": 3,
                "${FONT_SIZE_LARGE}": 5
            },
            "${RESOLUTION_2k}": {
                "${FONT_SIZE_SMALL}": 3,
                "${FONT_SIZE_MEDIUM}": 4.5,
                "${FONT_SIZE_LARGE}": 6
            },
            "${RESOLUTION_4k}": {
                "${FONT_SIZE_SMALL}": 4,
                "${FONT_SIZE_MEDIUM}": 6.5,
                "${FONT_SIZE_LARGE}": 8
            }
        }
    },
    "${VARIANT_HEADING_5}": {
        "${FONT_SIZE_SMALL}": 0.85,
        "${FONT_SIZE_MEDIUM}": 1.5,
        "${FONT_SIZE_LARGE}": 3,
        "fontWeight": ${FONT_WEIGHT_MEDIUM},
        "lineHeight": 1,
        "letterSpacingHeight": 0,
        "resolutions": {
            "${RESOLUTION_HD}": {
                "${FONT_SIZE_SMALL}": 0.85,
                "${FONT_SIZE_MEDIUM}": 1.5,
                "${FONT_SIZE_LARGE}": 3
            },
            "${RESOLUTION_FULL_HD}": {
                "${FONT_SIZE_SMALL}": 0.85,
                "${FONT_SIZE_MEDIUM}": 1.5,
                "${FONT_SIZE_LARGE}": 3
            },
            "${RESOLUTION_2k}": {
                "${FONT_SIZE_SMALL}": 3,
                "${FONT_SIZE_MEDIUM}": 4.5,
                "${FONT_SIZE_LARGE}": 6
            },
            "${RESOLUTION_4k}": {
                "${FONT_SIZE_SMALL}": 7,
                "${FONT_SIZE_MEDIUM}": 8.5,
                "${FONT_SIZE_LARGE}": 10
            }
        }
    },
    "${VARIANT_HEADING_6}": {
        "${FONT_SIZE_SMALL}": 0.50,
        "${FONT_SIZE_MEDIUM}": 0.85,
        "${FONT_SIZE_LARGE}": 1.25,
        "fontWeight": ${FONT_WEIGHT_REGULAR},
        "lineHeight": 1,
        "letterSpacingHeight": 0,
        "resolutions": {
            "${RESOLUTION_HD}": {
                "${FONT_SIZE_SMALL}": 0.50,
                "${FONT_SIZE_MEDIUM}": 0.85,
                "${FONT_SIZE_LARGE}": 1.25
            },
            "${RESOLUTION_FULL_HD}": {
                "${FONT_SIZE_SMALL}": 0.50,
                "${FONT_SIZE_MEDIUM}": 0.85,
                "${FONT_SIZE_LARGE}": 1.25
            },
            "${RESOLUTION_2k}": {
                "${FONT_SIZE_SMALL}": 2.50,
                "${FONT_SIZE_MEDIUM}": 3.85,
                "${FONT_SIZE_LARGE}": 5
            },
            "${RESOLUTION_4k}": {
                "${FONT_SIZE_SMALL}": 5.50,
                "${FONT_SIZE_MEDIUM}": 7,
                "${FONT_SIZE_LARGE}": 8.5
            }
        }
    },
    "${VARIANT_SUBTITLE_1}": {
        "${FONT_SIZE_SMALL}": 1.10,
        "${FONT_SIZE_MEDIUM}": 1.50,
        "${FONT_SIZE_LARGE}": 1.90,
        "fontWeight": ${FONT_WEIGHT_REGULAR},
        "lineHeight": 1.50,
        "letterSpacingHeight": 0,        
        "resolutions": {
            "${RESOLUTION_HD}": {
                "${FONT_SIZE_SMALL}": 1,
                "${FONT_SIZE_MEDIUM}": 1.30,
                "${FONT_SIZE_LARGE}": 1.60
            },
            "${RESOLUTION_FULL_HD}": {
                "${FONT_SIZE_SMALL}": 1.50,
                "${FONT_SIZE_MEDIUM}": 1.90,
                "${FONT_SIZE_LARGE}": 2.30
            },
            "${RESOLUTION_2k}": {
                "${FONT_SIZE_SMALL}": 2.40,
                "${FONT_SIZE_MEDIUM}": 2.70,
                "${FONT_SIZE_LARGE}": 3.10
            },
            "${RESOLUTION_4k}": {
                "${FONT_SIZE_SMALL}": 3.50,
                "${FONT_SIZE_MEDIUM}": 3.90,
                "${FONT_SIZE_LARGE}": 4.20
            }
        }
    },
    "${VARIANT_SUBTITLE_2}": {
        "${FONT_SIZE_SMALL}": 0.90,
        "${FONT_SIZE_MEDIUM}": 1.10,
        "${FONT_SIZE_LARGE}": 1.50,
        "fontWeight": ${FONT_WEIGHT_MEDIUM},
        "lineHeight": 1.50,
        "letterSpacingHeight": 0,        
        "resolutions": {
            "${RESOLUTION_HD}": {
                "${FONT_SIZE_SMALL}": 0.70,
                "${FONT_SIZE_MEDIUM}": 1,
                "${FONT_SIZE_LARGE}": 1.30
            },
            "${RESOLUTION_FULL_HD}": {
                "${FONT_SIZE_SMALL}": 1.10,
                "${FONT_SIZE_MEDIUM}": 1.50,
                "${FONT_SIZE_LARGE}": 2
            },
            "${RESOLUTION_2k}": {
                "${FONT_SIZE_SMALL}": 2,
                "${FONT_SIZE_MEDIUM}": 2.40,
                "${FONT_SIZE_LARGE}": 2.90
            },
            "${RESOLUTION_4k}": {
                "${FONT_SIZE_SMALL}": 3.10,
                "${FONT_SIZE_MEDIUM}": 3.50,
                "${FONT_SIZE_LARGE}": 3.90
            }
        }
    },
    "${VARIANT_BODY1}": {
        "${FONT_SIZE_SMALL}": 0.90,
        "${FONT_SIZE_MEDIUM}": 1.20,
        "${FONT_SIZE_LARGE}": 1.50,
        "fontWeight": ${FONT_WEIGHT_REGULAR},
        "lineHeight": 1.50,
        "letterSpacingHeight": 0.05,
        "resolutions": {
            "${RESOLUTION_HD}": {
                "${FONT_SIZE_SMALL}": 0.90,
                "${FONT_SIZE_MEDIUM}": 1,
                "${FONT_SIZE_LARGE}": 1.10
            },
            "${RESOLUTION_FULL_HD}": {
                "${FONT_SIZE_SMALL}": 1.50,
                "${FONT_SIZE_MEDIUM}": 1.80,
                "${FONT_SIZE_LARGE}": 2
            },
            "${RESOLUTION_2k}": {
                "${FONT_SIZE_SMALL}": 2.10,
                "${FONT_SIZE_MEDIUM}": 2.40,
                "${FONT_SIZE_LARGE}": 2.70
            },
            "${RESOLUTION_4k}": {
                "${FONT_SIZE_SMALL}": 3,
                "${FONT_SIZE_MEDIUM}": 3.40,
                "${FONT_SIZE_LARGE}": 3.80
            }
        }
    },
    "${VARIANT_BODY2}": {
        "${FONT_SIZE_SMALL}": 0.70,
        "${FONT_SIZE_MEDIUM}": 0.90,
        "${FONT_SIZE_LARGE}": 1.20,
        "fontWeight": ${FONT_WEIGHT_BOLD},
        "lineHeight": 1.50,
        "letterSpacingHeight": 0.05,
        "resolutions": {
            "${RESOLUTION_HD}": {
                "${FONT_SIZE_SMALL}": 0.70,
                "${FONT_SIZE_MEDIUM}": 0.90,
                "${FONT_SIZE_LARGE}": 1
            },
            "${RESOLUTION_FULL_HD}": {
                "${FONT_SIZE_SMALL}": 1.10,
                "${FONT_SIZE_MEDIUM}": 1.40,
                "${FONT_SIZE_LARGE}": 1.60
            },
            "${RESOLUTION_2k}": {
                "${FONT_SIZE_SMALL}": 1.80,
                "${FONT_SIZE_MEDIUM}": 2.10,
                "${FONT_SIZE_LARGE}": 2.40
            },
            "${RESOLUTION_4k}": {
                "${FONT_SIZE_SMALL}": 2.80,
                "${FONT_SIZE_MEDIUM}": 3,
                "${FONT_SIZE_LARGE}": 3.40
            }
        }
    },
    "${VARIANT_BUTTON}": {
        "${FONT_SIZE_SMALL}": 0.90,
        "${FONT_SIZE_MEDIUM}": 1.20,
        "${FONT_SIZE_LARGE}": 1.50,
        "fontWeight": ${FONT_WEIGHT_BOLD},
        "lineHeight": 1.50,
        "letterSpacingHeight": 0.05,
        "resolutions": {
            "${RESOLUTION_HD}": {
                "${FONT_SIZE_SMALL}": 0.80,
                "${FONT_SIZE_MEDIUM}": 1,
                "${FONT_SIZE_LARGE}": 1.30
            },
            "${RESOLUTION_FULL_HD}": {
                "${FONT_SIZE_SMALL}": 1,
                "${FONT_SIZE_MEDIUM}": 1.30,
                "${FONT_SIZE_LARGE}": 1.70
            },
            "${RESOLUTION_2k}": {
                "${FONT_SIZE_SMALL}": 2.50,
                "${FONT_SIZE_MEDIUM}": 3,
                "${FONT_SIZE_LARGE}": 3.10
            },
            "${RESOLUTION_4k}": {
                "${FONT_SIZE_SMALL}": 3.30,
                "${FONT_SIZE_MEDIUM}": 3.70,
                "${FONT_SIZE_LARGE}": 4.10
            }
        }
    },
    "${VARIANT_CAPTION}": {
        "${FONT_SIZE_SMALL}": 0.75,
        "${FONT_SIZE_MEDIUM}": 1.10,
        "${FONT_SIZE_LARGE}": 1.30,
        "fontWeight": ${FONT_WEIGHT_REGULAR},
        "lineHeight": 1.50,
        "letterSpacingHeight": 0.05,
        "resolutions": {
            "${RESOLUTION_HD}": {
                "${FONT_SIZE_SMALL}": 1,
                "${FONT_SIZE_MEDIUM}": 1.20,
                "${FONT_SIZE_LARGE}": 1.40
            },
            "${RESOLUTION_FULL_HD}": {
                "${FONT_SIZE_SMALL}": 1.30,
                "${FONT_SIZE_MEDIUM}": 1.50,
                "${FONT_SIZE_LARGE}": 1.75
            },
            "${RESOLUTION_2k}": {
                "${FONT_SIZE_SMALL}": 1.75,
                "${FONT_SIZE_MEDIUM}": 2.10,
                "${FONT_SIZE_LARGE}": 2.30
            },
            "${RESOLUTION_4k}": {
                "${FONT_SIZE_SMALL}": 2.45,
                "${FONT_SIZE_MEDIUM}": 3,
                "${FONT_SIZE_LARGE}": 3.30
            }
        }
    },
    "${VARIANT_OVERLINE}": {
        "${FONT_SIZE_SMALL}": 0.75,
        "${FONT_SIZE_MEDIUM}": 1.10,
        "${FONT_SIZE_LARGE}": 1.30,
        "fontWeight": ${FONT_WEIGHT_BOLD},
        "lineHeight": 1.50,
        "letterSpacingHeight": 0.05,
        "resolutions": {
            "${RESOLUTION_HD}": {
                "${FONT_SIZE_SMALL}": 1,
                "${FONT_SIZE_MEDIUM}": 1.20,
                "${FONT_SIZE_LARGE}": 1.40
            },
            "${RESOLUTION_FULL_HD}": {
                "${FONT_SIZE_SMALL}": 1.30,
                "${FONT_SIZE_MEDIUM}": 1.50,
                "${FONT_SIZE_LARGE}": 1.75
            },
            "${RESOLUTION_2k}": {
                "${FONT_SIZE_SMALL}": 1.75,
                "${FONT_SIZE_MEDIUM}": 2.10,
                "${FONT_SIZE_LARGE}": 2.30
            },
            "${RESOLUTION_4k}": {
                "${FONT_SIZE_SMALL}": 2.45,
                "${FONT_SIZE_MEDIUM}": 3,
                "${FONT_SIZE_LARGE}": 3.30
            }
        }
    }
}`);

/**
 * This function will generate the variant with the required font configurations.
 * The font configurations will be added from the above declared VARIANT_FONT_CONFIGURATIONS
 *
 * @param variantName variant name for which we needed the font size
 * @param fontSizeCategory font size category. it can take value like 'small', 'medium' or 'large',
 * if no value is passed, then it will consider default as DEFAULT_FONT_SIZE_CATEGORY.
 * @param fontFamilyName fontFamily needed to be added to the variant. [optional]
 * @param additionalConfigurations additional font configurations if needed. [optional]
 * @returns a variant configuration instance with all passed values.
 */
const buildVariant = (
    variantName: string,
    fontSizeCategory: string = DEFAULT_FONT_SIZE_CATEGORY,
    fontFamilyName: string = DEFAULT_FONT_FAMILY,
    additionalConfigurations: any = {},
) => {
    const ROUND = (value: number) => {
        return Math.round(value * 1e5) / 1e5;
    };
    const size = getFontSize(variantName, fontSizeCategory);
    const lineHeight = VARIANT_FONT_CONFIGURATIONS[variantName]['lineHeight'];
    const letterSpacingValue = VARIANT_FONT_CONFIGURATIONS[variantName]['letterSpacingHeight'];
    const fontWeight = VARIANT_FONT_CONFIGURATIONS[variantName]['fontWeight'];
    return {
        fontFamily: fontFamilyName,
        fontWeight,
        fontSize: PX_TO_REM(size),
        // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
        lineHeight,
        // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
        // across font-families can cause issues with the kerning.
        ...(fontFamilyName === DEFAULT_FONT_FAMILY
            ? {
                  letterSpacing: `${ROUND(letterSpacingValue / size)}em`,
              }
            : {}),
        // Add the responsive font configurations.
        ...getResponsiveFontConfigurations(variantName, fontSizeCategory),
        // Add any additional configurations if required.
        ...additionalConfigurations,
    };
};

/**
 * This return the font size from the VARIANT_CONFIGURATIONS where we have variantName,
 * fontSizeCategory and screenResolutionRange.
 *
 * @param variantName variant name for which we needed the font size
 * @param fontSizeCategory font size category. it can take value like 'small', 'medium' or 'large',
 * if no value is passed, then it will consider default as DEFAULT_FONT_SIZE_CATEGORY.
 * @param screenResolutionRange value for which resolution screen we needed the respective value.
 * @returns return the respective fontSize from the VARIANT_CONFIGURATIONS for which we found the match for variantName,
 * fontSizeCategory and screenResolutionRange, DEFAULT_FONT_SIZE will be default value.
 */
export const getFontSize = (
    variantName: string,
    fontSizeCategory: string = DEFAULT_FONT_SIZE_CATEGORY,
    screenResolutionRange = '',
) => {
    if (variantName && fontSizeCategory) {
        if (screenResolutionRange !== '') {
            return VARIANT_FONT_CONFIGURATIONS[variantName]['resolutions'][screenResolutionRange][fontSizeCategory];
        } else {
            return VARIANT_FONT_CONFIGURATIONS[variantName][fontSizeCategory];
        }
    }
    return DEFAULT_FONT_SIZE;
};

/**
 * This will generate the font configurations for the variant supported in the Typography.
 * Currently we supported the responsive behavior for the following screen resolutions.
 * 1. HD
 * 2. FULL_HD
 * 3. 2k
 * 4. 4k
 * we referred the resolution configurations for media query from the responsive util constants.
 * Later if we have different resolution added then we needed to add those configuration in responsive util
 * and needed to update the structure according.
 * @param variantName variant name for which we needed the font configurations
 * @param fontSizeCategory font size category. it can take value like 'small', 'medium' or 'large',
 * if no value is passed, then it will consider default as DEFAULT_FONT_SIZE_CATEGORY.
 * @returns return Font configuration with responsive ranges added wrt the font size category selected.
 */
const getResponsiveFontConfigurations = (
    variantName: string,
    fontSizeCategory: string = DEFAULT_FONT_SIZE_CATEGORY,
) => {
    return JSON.parse(`{
        "${RESOLUTION_HD_MEDIA_QUERY}": {
            "fontSize": "${PX_TO_REM(getFontSize(variantName, fontSizeCategory, RESOLUTION_HD))}"
        },
        "${RESOLUTION_FULL_HD_MEDIA_QUERY}": {
            "fontSize": "${PX_TO_REM(getFontSize(variantName, fontSizeCategory, RESOLUTION_FULL_HD))}"
        },
        "${RESOLUTION_2k_MEDIA_QUERY}": {
            "fontSize": "${PX_TO_REM(getFontSize(variantName, fontSizeCategory, RESOLUTION_2k))}"
        },
        "${RESOLUTION_4k_MEDIA_QUERY}": {
            "fontSize": "${PX_TO_REM(getFontSize(variantName, fontSizeCategory, RESOLUTION_4k))}"
        }
    }`);
};

/**
 * This function generate the font configuration wrt to the font size category selected.
 * @param fontSizeCategory font size category. it can take value like 'small', 'medium' or 'large',
 * if no value is passed, then it will consider default as DEFAULT_FONT_SIZE_CATEGORY.
 * @returns return Typography configuration for the theme wrt the font size category selected.
 */
export const getTypographyForTheme = (fontSizeCategory: string = DEFAULT_FONT_SIZE_CATEGORY) => {
    return {
        htmlFontSize: HTML_FONT_SIZE,
        fontFamily: DEFAULT_FONT_FAMILY,
        fontSize: DEFAULT_FONT_SIZE,
        fontWeight: DEFAULT_FONT_WEIGHT,
        h1: {
            ...buildVariant(VARIANT_HEADING_1, fontSizeCategory),
        },
        h2: {
            ...buildVariant(VARIANT_HEADING_2, fontSizeCategory),
        },
        h3: {
            ...buildVariant(VARIANT_HEADING_3, fontSizeCategory),
        },
        h4: {
            ...buildVariant(VARIANT_HEADING_4, fontSizeCategory),
        },
        h5: {
            ...buildVariant(VARIANT_HEADING_5, fontSizeCategory),
        },
        h6: {
            ...buildVariant(VARIANT_HEADING_6, fontSizeCategory),
        },
        subtitle1: {
            ...buildVariant(VARIANT_SUBTITLE_1, fontSizeCategory),
        },
        subtitle2: {
            ...buildVariant(VARIANT_SUBTITLE_2, fontSizeCategory),
        },
        body1: {
            ...buildVariant(VARIANT_BODY1, fontSizeCategory),
        },
        body2: {
            ...buildVariant(VARIANT_BODY2, fontSizeCategory, DEFAULT_FONT_FAMILY_BOLD),
        },
        button: {
            ...buildVariant(VARIANT_BUTTON, fontSizeCategory),
        },
        caption: {
            ...buildVariant(VARIANT_CAPTION, fontSizeCategory, DEFAULT_FONT_FAMILY_OBLIQUE),
        },
        overline: {
            ...buildVariant(VARIANT_OVERLINE, fontSizeCategory, DEFAULT_FONT_FAMILY_BOLD),
        },
    };
};
