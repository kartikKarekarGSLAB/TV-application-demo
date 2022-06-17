import { useState, FunctionComponent } from 'react';
import Keyboard from 'react-simple-keyboard';
import {
    VirtualKeyboardProperties,
    DEFAULT_LAYOUT_NAME,
    SHIFT_LAYOUT_NAME,
    SPECIAL_AND_NUMERIC_LAYOUT_NAME,
    DISPLAY_LABELS,
    BUTTON_ATTRIBUTE,
    DEFAULT_LAYOUT,
    physicalKeyboardHighlightBgColor,
    physicalKeyboardHighlightTextColor,
} from './config/VirtualKeyboardConfigurations';
import '../../../assets/styles/common/common-components/keyboard/VirtualKeyboard.scss';

/**
 * This function will create the keyboard component.
 * @param {VirtualKeyboardProperties} keyboardConfigurations configurations required to create the keyboard
 * @returns return the Keyboard component
 */
const VirtualKeyboard: FunctionComponent<VirtualKeyboardProperties> = ({
    keyboardReference,
    inputFieldName = 'default',
    keyboardLocale = 'en_us',
    defaultLayout = DEFAULT_LAYOUT_NAME,
    onChange = (input: string) => {
        console.log('VirtualKeyboard : default onChange function.', input);
    },
    onChangeAll = (input: any) => {
        console.log('VirtualKeyboard : default onChangeAll function.', input);
    },
}: VirtualKeyboardProperties) => {
    console.log('VirtualKeyboard : loading the keyboard for locale=', keyboardLocale);
    // The layout will be used to set the layout for keyboard.
    const [layout, setLayout] = useState(defaultLayout);

    /**
     * Key events callback function.
     * Executes the callback function on key release.
     * Returns button layout name.
     * @param button string representing the layout name of button.
     * @returns string button layout name.
     */
    const onKeyReleased = (button: string): string => {
        // TODO :: Add the logic here to update the keyboard layout.
        console.log('VirtualKeyboard : (1) key released=', button);
        return button;
    };

    /**
     * Key events callback function.
     * Executes the callback function on key press.
     * Returns button layout name.
     * @param button string representing the layout name of button.
     * @returns string button layout name.
     */
    const onKeyPress = (button: string): string => {
        // TODO :: Add the logic here to update the keyboard layout.
        console.log('VirtualKeyboard : (2) key press=', button);
        if (button === '{shift}' || button === '{lock}') setLayout(SHIFT_LAYOUT_NAME);
        if (button === '{alpha}' || button === '{small}') setLayout(DEFAULT_LAYOUT_NAME);
        if (button === '{specialAndNumeric}') setLayout(SPECIAL_AND_NUMERIC_LAYOUT_NAME);
        return button;
    };

    /**
     * Lifecycle Method.
     * Executes the callback function before a VirtualKeyboard (simple-keyboard) render.
     */
    const beforeFirstRender = () => {
        console.log('VirtualKeyboard : (1) VirtualKeyboard (simple-keyboard) will render for the first time.');
    };

    /**
     * Lifecycle Method.
     * Executes the callback function every time VirtualKeyboard (simple-keyboard)
     * is rendered (e.g: when you change layouts).
     */
    const onRender = () => {
        console.log('VirtualKeyboard : (2) The custom keyboard it getting rendered.', keyboardReference);
        // if (keyboardReference) {
        //     if (keyboardReference.current && keyboardReference.current.recurseButtons) {
        //         keyboardReference.current.recurseButtons((buttonElement: any) => {
        //             console.log('buttonElement using current-->', buttonElement);
        //         });
        //     } else if (keyboardReference.recurseButtons) {
        //         keyboardReference.recurseButtons((buttonElement: any) => {
        //             console.log('buttonElement-->', buttonElement);
        //         });
        //     }
        // }
    };

    /**
     * Lifecycle Method.
     * Executes the callback function once VirtualKeyboard (simple-keyboard) is
     * rendered for the first time (on initialization).
     * @param {object} keyboard object representing the keyboard instance.
     */
    const onInit = (keyboard: any) => {
        console.log('VirtualKeyboard : (3) VirtualKeyboard (simple-keyboard) initialized.', keyboard.buttonElements);
        // if (keyboard && keyboard.recurseButtons) {
        //     keyboard.recurseButtons((buttonElement: any) => {
        //         console.log('buttonElement init -->', buttonElement);
        //     });
        // }
    };

    return (
        <Keyboard
            // Keyboard component specific.
            keyboardRef={(reference: any) => (keyboardReference.current = reference)}
            layoutName={layout}
            layout={DEFAULT_LAYOUT}
            display={DISPLAY_LABELS}
            buttonAttributes={BUTTON_ATTRIBUTE} // This will be needed to add the mx-focusable attribute.
            disableCaretPositioning={true}
            physicalKeyboardHighlight={true}
            physicalKeyboardHighlightTextColor={physicalKeyboardHighlightTextColor} // Use the color from theme.
            physicalKeyboardHighlightBgColor={physicalKeyboardHighlightBgColor} // Use the color from theme.
            onInit={onInit}
            onRender={onRender}
            beforeFirstRender={beforeFirstRender}
            onKeyReleased={onKeyReleased}
            onKeyPress={onKeyPress}
            // input element specific.
            onChange={onChange} // Callback function when the keyboard input get changed.
            onChangeAll={onChangeAll}
            inputName={inputFieldName} // Set the id of the input element.
        />
    );
};

export default VirtualKeyboard;
