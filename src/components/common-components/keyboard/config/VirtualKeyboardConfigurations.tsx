/**
 * @interface VirtualKeyboardProperties will be the type for the VirtualKeyboard functional component.
 * @property keyboardRef {object} this represent the keyboard reference object.
 * @property inputFieldName {string} the id/name of the input element’s to which the keyboard is bind.
 * @property keyboardLocale {string} the locale supported by the keyboard. Optional property.
 * @property defaultLayout {string} the default layout supported by the keyboard. Optional property.
 * @property onChange {function(input:string):string} This is the callback function passed from
 * the input element’s to which the keyboard instance is bind.
 *
 * Note:: propertyName?: type; This indicate that this property is Optional.
 */
export interface VirtualKeyboardProperties {
    keyboardReference: any;
    keyboardLocale?: string;
    inputFieldName?: string;
    defaultLayout?: string;
    onChange?: (input: string) => void;
    onChangeAll?: (input: any) => void;
}

// Default layout name.
export const DEFAULT_LAYOUT_NAME = 'default';
// Shift layout name.
export const SHIFT_LAYOUT_NAME = 'shift';
// Special and numeric.
export const SPECIAL_AND_NUMERIC_LAYOUT_NAME = 'specialAndNumeric';
// Numeric default layout name.
export const NUMERIC_DEFAULT_LAYOUT_NAME = 'defaultNumeric';

/**
 * This is the list of supported layout options.
 * The layout identify as the format in which the keys will be shown,
 * over the keyboard. the object has many different keys. Keys of object signifies the
 * supported layout name. 'default' will be the default layout name.
 * as per the need different layout can be added.
 * Below declared object is used to support the layout and characters of English locale.
 *
 * - Available layouts :: TODO.
 * https://github.com/hodgef/simple-keyboard-layouts/tree/master/src/lib/layouts
 */
export const DEFAULT_LAYOUT = {
    default: [
        'q w e r t y u i o p',
        'a s d f g h j k l',
        'z x c v b n m {backspace}',
        '{shift} {space} {specialAndNumeric}',
    ],
    shift: [
        'Q W E R T Y U I O P',
        'A S D F G H J K L',
        'Z X C V B N M {backspace}',
        '{small} {space} {specialAndNumeric}',
    ],
    specialAndNumeric: [
        '1 2 3 4 5 6 7 8 9 0',
        '~ ! @ # $ % ^ &amp; * ( ) ',
        '_ + { } | : " &lt; &gt; ?',
        '.com {space} {small}',
    ],
    defaultNumeric: ['1 2 3', '4 5 6', '7 8 9', '+ 0 *', '{shift} {backspace}'],
};

/**
 * @object
 * @property {string} values of buttons in the keyboard.
 * @value {string} value used to display over the keyboard.
 * Replaces layout buttons with a human-friendly name.
 */
export const DISPLAY_LABELS = {
    '{space}': 'Space',
    '{shift}': 'ABC ⇧',
    '{small}': 'abc ⇧',
    '{specialAndNumeric}': '?123',
    '{numeric}': '123',
    '{alpha}': 'abc',
    '{lock}': 'caps lock ⇪',
    '{escape}': 'esc ⎋',
    '{tab}': 'Tab ⇥',
    '{bksp}': 'Backspace ⌫',
    '{backspace}': 'Backspace ⌫',
    '{enter}': 'Enter ↵',
    '{shiftleft}': 'Shift ⇧',
    '{shiftright}': 'Shift ⇧',
    '{controlleft}': 'Ctrl ⌃',
    '{controlright}': 'Ctrl ⌃',
    '{altleft}': 'Alt ⌥',
    '{altright}': 'Alt ⌥',
    '{metaleft}': 'Cmd ⌘',
    '{metaright}': 'Cmd ⌘',
};

/**
 * This option allows you to define input suggestions to present to the user.
 * Use the different layout options as,
 * inputKeyName: 'suggestions list spaces separated.'
 *
 * For example,
 * a: 'aa aaa aaaa'
 */
export const layoutCandidates = {};

/**
 * Use this option to remove buttons from your layout.
 * Use the object keys as layout names.
 * {
 *  layoutName: ["inputKeyLabels spaces separated list."]
 * }
 * For example,
 * { default: ["@", ".com"], shift: ["@", ".com"] }
 */
export const excludeFromLayout = {};

/**
 * A prop to add your own attributes to one or several buttons.
 * Here we needed to add the button with all possible keys supported.
 */
export const BUTTON_ATTRIBUTE = [
    {
        attribute: 'mx-focusable',
        value: 'true',
        buttons: '*',
    },
];

// Read the colors from theme specific variables.
export const physicalKeyboardHighlightBgColor = getComputedStyle(document.body).getPropertyValue(
    '--selected-ui-background',
);
export const physicalKeyboardHighlightTextColor = getComputedStyle(document.body).getPropertyValue('--selected-ui');

export const layoutCandidatesPageSize = 5;
