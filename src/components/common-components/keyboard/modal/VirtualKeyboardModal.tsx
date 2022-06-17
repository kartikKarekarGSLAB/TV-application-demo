import { useState, FunctionComponent, ChangeEvent, useRef } from 'react';
import Keyboard from 'react-simple-keyboard';
import {
    VirtualKeyboardModalProperties,
    DEFAULT_KEYBOARD_MODAL_OPEN_STATE,
    DEFAULT_LAYOUT_NAME,
    SHIFT_LAYOUT_NAME,
    SPECIAL_SYMBOL_LAYOUT_NAME,
    DISPLAY_LABELS,
    BUTTON_ATTRIBUTE,
    DEFAULT_LAYOUT,
    BUTTON_THEME,
    physicalKeyboardHighlightBgColor,
    physicalKeyboardHighlightTextColor,
    keyboardModalStyle,
} from '../config/modal/VirtualKeyboardModalConfigurations';
import '../../../../assets/styles/common/common-components/keyboard/VirtualKeyboardModal.scss';
import '../../../../assets/styles/mediaQueryBoundries.scss';
import Modal from '@mui/material/Modal/Modal';
import Box from '@mui/material/Box/Box';
import { IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

/**
 * This function will create the keyboard component added in side the Modal dialog.
 * It has it's own associated input element. it will bind that input element with the respective keyboard instance.
 * Once we have typed the data inside the associated input element the value will get updated.
 * @param {VirtualKeyboardModalProperties} keyboardConfigurations configurations required to create the keyboard
 * @returns return the Keyboard component
 */
const VirtualKeyboardModal: FunctionComponent<VirtualKeyboardModalProperties> = ({
    keyboardModalOpenState = DEFAULT_KEYBOARD_MODAL_OPEN_STATE,
    keyboardLocale = 'en_us',
    defaultLayout = DEFAULT_LAYOUT_NAME,
    bindInputElementName = 'default',
    bindInputElementLabel = 'Data',
    bindInputElementType = 'text',
    bindInputElementValue = '',
    /**
     * This function will be callback function added for a event triggered when
     * Modal keyboard is getting closed.
     */
    handleKeyboardModalClose = () => {
        console.log('VirtualKeyboardModal : default handleKeyboardModalClose function.');
    },
    /**
     * This function will be callback function added for a change of input elements value.
     * This will pass the updated value for the associated input element to the bind input
     * element.
     * @param inputName {string} bind input element name.
     * @param inputValue {string} updated input element value.
     */
    onChangeUpdateBindInputElementValue = (inputName: string, inputValue: string) => {
        console.log(
            'VirtualKeyboardModal : default onChangeUpdateBindInputElementValue function. inputName=',
            inputName,
            ', inputValue=',
            inputValue,
        );
    },
}: VirtualKeyboardModalProperties) => {
    console.log(
        'VirtualKeyboardModal : loading the keyboard for locale=',
        keyboardLocale,
        ', for bindInputElementName=',
        bindInputElementName,
        ', keyboardModalOpenState=',
        keyboardModalOpenState,
        ', bindInputElementType=',
        bindInputElementType,
    );
    const modalInputFieldName = 'modalInputField';
    // This is for the keyboard instance.
    const keyboard: any = useRef(null);
    // The layout will be used to set the layout for keyboard.
    const [layout, setLayout] = useState(defaultLayout);
    const [modalInputElementValue, setModalInputElementValue] = useState(bindInputElementValue);
    const [showPassword, setShowPassword] = useState(false);
    const [inputElementType, setInputElementType] = useState(bindInputElementType);

    /**
     * This will be callback function for the show password icon added inside
     * the input element field. On click of it will toggle the input type and update
     * the show/hide password icon.
     */
    const handleClickShowHidePasswordIcon = (event: any) => {
        console.log(event);
        setShowPassword(!showPassword);
        setInputElementType(showPassword ? 'text' : 'password');
    };

    /**
     * This function will be callback function getting added
     * when the mouseDownEvent getting trigged for the password type
     * input element.
     * @param event {MouseEvent} event instance.
     */
    const handleMouseDownShowHidePasswordIcon = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    /**
     * This function will be call back for the value change of the keyboard.
     * @param event {ChangeEvent} triggered from the onChange event for input element.
     */
    const onInputChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        // 1. Get the value from the keyboard.
        const updatedValue = event.target.value;
        const updatedName = event.target.id;
        // 2. Set the input in current state.
        setModalInputElementValue(updatedValue);
        onChangeUpdateBindInputElementValue(updatedName, updatedValue);
        // 3. Set the input for the current keyboard reference.
        keyboard.current.setInput(updatedValue);
    };

    /**
     * This will clear the input from the associated input element as well from
     * the keyboard component.
     */
    const clearAllInput = () => {
        setModalInputElementValue('');
        if (keyboard && keyboard.current) {
            keyboard.current.setInput('');
        }
    };

    /**
     * This function will be callback function when the associated keyboard
     * value getting updated.
     * @param updatedValue {string} updated value from the change.
     */
    const onChangeCallback = (updatedValue: string): void => {
        // 2. Set the input in current state.
        setModalInputElementValue(updatedValue);
        onChangeUpdateBindInputElementValue(bindInputElementName, updatedValue);
    };

    /**
     * Key events callback function.
     * Executes the callback function on key release.
     * Returns button layout name.
     * @param button string representing the layout name of button.
     * @returns string button layout name.
     */
    const onKeyReleased = (button: string): string => {
        // TODO :: Add the logic here to update the keyboard layout.
        console.log('VirtualKeyboardModal : (1) key released=', button);
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
        console.log('VirtualKeyboardModal : (2) key press=', button);
        if (button === '{shift}' || button === '{lock}') setLayout(SHIFT_LAYOUT_NAME);
        if (button === '{alpha}' || button === '{small}' || button === '{specialSmall}') setLayout(DEFAULT_LAYOUT_NAME);
        if (button === '{specialSymbols}') setLayout(SPECIAL_SYMBOL_LAYOUT_NAME);
        if (button === '{ok}') handleKeyboardModalClose();
        if (button === '{clearAll}') clearAllInput();
        return button;
    };

    /**
     * Lifecycle Method.
     * Executes the callback function before a VirtualKeyboard (simple-keyboard) render.
     */
    const beforeFirstRender = () => {
        console.log('VirtualKeyboardModal : (1) VirtualKeyboard (simple-keyboard) will render for the first time.');
    };

    /**
     * Lifecycle Method.
     * Executes the callback function every time VirtualKeyboard (simple-keyboard)
     * is rendered (e.g: when you change layouts).
     */
    const onRender = () => {
        console.log('VirtualKeyboardModal : (2) The custom keyboard it getting rendered.', keyboard);
    };

    /**
     * Lifecycle Method.
     * Executes the callback function once VirtualKeyboard (simple-keyboard) is
     * rendered for the first time (on initialization).
     * @param {object} keyboard object representing the keyboard instance.
     */
    const onInit = (keyboard: any) => {
        console.log('VirtualKeyboard : (3) VirtualKeyboard (simple-keyboard) initialized.', keyboard.buttonElements);
        setModalInputElementValue('');
        keyboard.setInput('');
    };

    let endAdornment = null;
    if (bindInputElementType === 'password') {
        endAdornment = (
            <InputAdornment position="end" mx-focusable="true">
                <IconButton
                    className="virtual-keyboard-password-show-hide-icon"
                    aria-label="toggle password visibility"
                    onClick={(event) => handleClickShowHidePasswordIcon(event)}
                    onMouseDown={(event) => handleMouseDownShowHidePasswordIcon(event)}
                    edge="end"
                    mx-focusable="true"
                >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
        );
    }
    return (
        // Modal outer layer for keyboard.
        <Modal open={keyboardModalOpenState} onClose={handleKeyboardModalClose}>
            <Box sx={keyboardModalStyle}>
                {/* Label to be displayed for the input. */}
                <Typography variant="subtitle1">Enter {bindInputElementLabel}</Typography>
                <div className="virtual-keyboard-divider"></div>
                {/* Input element for the modal keyboard */}
                <OutlinedInput
                    className="virtual-keyboard-modal-input"
                    id={bindInputElementName}
                    type={inputElementType}
                    value={modalInputElementValue}
                    onChange={(e) => onInputChange(e)}
                    endAdornment={endAdornment}
                    mx-focusable="true"
                />
                {/* Keyboard component shown for the Modal. */}
                <Keyboard
                    // Keyboard component specific.
                    keyboardRef={(reference: any) => (keyboard.current = reference)}
                    layoutName={layout}
                    layout={DEFAULT_LAYOUT}
                    display={DISPLAY_LABELS}
                    buttonTheme={BUTTON_THEME}
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
                    onChange={onChangeCallback} // Callback function when the keyboard input get changed.
                    inputName={modalInputFieldName} // Set the id of the input element.
                />
            </Box>
        </Modal>
    );
};

export default VirtualKeyboardModal;
