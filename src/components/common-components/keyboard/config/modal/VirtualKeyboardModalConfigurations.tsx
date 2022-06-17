/**
 * @interface VirtualKeyboardModalProperties will be the type for the VirtualKeyboardModal functional component.
 * @property keyboardModalOpenState {boolean} this boolean value represent the keyboard modal should be in open state or not.
 * @property keyboardLocale {string} the locale supported by the keyboard. Optional property.
 * @property defaultLayout {string} the default layout supported by the keyboard. Optional property.
 * @property bindInputElementName {string} the id/name of the input element’s to which the keyboard is opened.
 * @property bindInputElementType {string} the type of the input element’s to which the keyboard is opened.
 * @property bindInputElementValue {string} the value of the input element’s to which the keyboard is opened.
 * @property onChangeUpdateBindInputElementValue {function} the callback function which wil update the value of input element for which the keyboard modal is open.
 * @property handleKeyboardModalClose {function} the function which will update the 'open' flag for the component, when the keyboard modal getting closed.
 *
 * Note:: propertyName?: type; This indicate that this property is Optional.
 */
export interface VirtualKeyboardModalProperties {
    keyboardModalOpenState?: boolean;
    keyboardLocale?: string;
    defaultLayout?: string;
    bindInputElementName?: string;
    bindInputElementType?: string;
    bindInputElementValue?: string;
    bindInputElementLabel?: string;
    onChangeUpdateBindInputElementValue?: (inputName: string, inputValue: string) => void;
    handleKeyboardModalClose?: () => void;
}
//
export const DEFAULT_KEYBOARD_MODAL_OPEN_STATE = false;

// Default layout name.
export const DEFAULT_LAYOUT_NAME = 'default';
// Shift layout name.
export const SHIFT_LAYOUT_NAME = 'shift';
// Special symbols layout.
export const SPECIAL_SYMBOL_LAYOUT_NAME = 'specialSymbols';
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
        'a b c d e f g 1 2 3 {backspace}',
        'h i j k l m n 4 5 6 {shift}',
        'o p q r s t u 7 8 9 {specialSymbols}',
        'v w x y z - + # . 0 @',
        '{space}',
        '{ok}',
        '{clearAll}',
    ],
    shift: [
        'A B C D E F G 1 2 3 {backspace}',
        'H I J K L M N 4 5 6 {small}',
        'O P Q R S T U 7 8 9 {specialSymbols}',
        'V W X Y Z - + # . 0 @',
        '{space}',
        '{ok}',
        '{clearAll}',
    ],
    specialSymbols: ['~ ! $ %', '^ &amp; ( )', '_ + { }', '| : &lt; &gt;', '" ? \' *', '{specialSmall}'],
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
    '{shift}': ' A⇧',
    '{small}': ' a⇧',
    '{specialSmall}': ' a⇧',
    '{specialSymbols}': '?$',
    '{numeric}': '123',
    '{alpha}': 'abc',
    '{lock}': 'caps lock ⇪',
    '{escape}': 'esc ⎋',
    '{tab}': 'Tab ⇥',
    '{bksp}': '⌫',
    '{backspace}': '⌫',
    '{enter}': 'Enter ↵',
    '{shiftleft}': 'Shift ⇧',
    '{shiftright}': 'Shift ⇧',
    '{controlleft}': 'Ctrl ⌃',
    '{controlright}': 'Ctrl ⌃',
    '{altleft}': 'Alt ⌥',
    '{altright}': 'Alt ⌥',
    '{metaleft}': 'Cmd ⌘',
    '{metaright}': 'Cmd ⌘',
    '{ok}': 'Ok',
    '{clearAll}': 'Clear All ⌫',
};

/**
 * This is the constant used to assign the styling to the buttons.
 * styling will be added with respective classes and 'buttons' will be
 * spaces separated list of buttons supported by the custom keyboard.
 */
export const BUTTON_THEME = [
    {
        class: 'alpha-keyboard-keys-button',
        buttons:
            'q w e r t y u i o p a s d f g h j k l z x c v b n m - _ Q W E R T Y U I O P A S D F G H J K L Z X C V B N M - + 2 3 5 6 8 9 . 0 ~ ! # $ % ^ &amp; @ * ( ) _ + { } | : " &lt; &gt; ? \'',
    },
    {
        class: 'numeric-keyboard-keys-button',
        buttons: '1 4 7 #',
    },
    {
        class: 'operations-keyboard-keys-button',
        buttons: '{backspace} {small} {shift} {specialSymbols} @',
    },
    {
        class: 'long-keyboard-key-button',
        buttons: '{ok} {space} {clearAll} {specialSmall}',
    },
    {
        class: 'ok-keyboard-key-button',
        buttons: '{ok}',
    },
    {
        class: 'space-keyboard-key-button',
        buttons: '{space}',
    },
];
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
        buttons:
            'q w e r t y u i o p a s d f g h j k l z x c v b n m - _ Q W E R T Y U I O P A S D F G H J K L Z X C V B N M - + 2 3 5 6 8 9 . 0 ~ ! # $ % ^ &amp; @ * ( ) _ + { } | : " &lt; &gt; ? \' 1 4 7 # {backspace} {small} {shift} {specialSymbols} {ok} {space} {clearAll} {specialSmall}',
    },
];

// Read the colors from theme specific variables.
export const physicalKeyboardHighlightBgColor = getComputedStyle(document.body).getPropertyValue(
    '--selected-ui-background',
);
export const physicalKeyboardHighlightTextColor = getComputedStyle(document.body).getPropertyValue('--selected-ui');

export const layoutCandidatesPageSize = 5;

/**
 * This styling getting applied for the keyboard modal.
 */
export const keyboardModalStyle: any = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    bgcolor: 'var(--selected-ui-background)',
    border: '1px solid var(--ui-03)',
    boxShadow: 24,
    p: 4,
};
