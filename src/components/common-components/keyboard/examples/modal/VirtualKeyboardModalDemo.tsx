/**
 * NOTE: This demo aims to explain the basic behavior of keyboard when we added it with,
 * the modal dialog.
 */
import { ChangeEvent, FunctionComponent, useRef, useState } from 'react';
import VirtualKeyboardModal from '../../modal/VirtualKeyboardModal';

// Input Field Identifier.
const firstInputFieldName = 'firstInputFieldNameIdentifier';
const firstInputFieldLabel = 'username';
const firstInputFieldValue = '';
const firstInputFieldType = 'text';

/**
 * This functional component used to test the integration of Virtual Keyboard,
 * with the application, with multiple input fields.
 * @returns Container with tow input field and custom keyboard.
 */
const VirtualKeyboardModalDemo: FunctionComponent = () => {
    // This is used to defined the state of the virtual keyboard
    const [keyboardModalOpenState, setKeyboardModalOpenState] = useState(false);
    // References will be needed to set the focus away from the input field.
    let firstInputFieldRef: any = useRef(null);
    /**
     * The virtual keyboard getting opened for the any input field.
     * To identify the input element associated along with the keyboard,
     * We needed to identify the inputFieldName, InputFileType and inputFiledValue.
     */
    const [inputFieldName, setInputFieldName] = useState(firstInputFieldName);
    const [inputFieldLabel, setInputFieldLabel] = useState(firstInputFieldLabel);
    const [inputFieldType, setInputFieldType] = useState(firstInputFieldType);
    const [inputFieldValue, setInputFieldValue] = useState(firstInputFieldValue);

    /**
     * This function will be callback when the keyboard component Modal.
     * Get closed.
     */
    const handleKeyboardModalCloseCallback = () => {
        setKeyboardModalOpenState(false);
    };

    const changeInputValue = (inputName: string, inputValue: string) => {
        console.log('changeInputValue : inputName=', inputName);
        setInputFieldValue(inputValue);
    };

    /**
     * This function will get triggered when, we the input element will get focus.
     * It will set the keyboardFieldName, that will update the inputName property of virtual keyboard.
     * @param loginFormFieldName {string} this will represent the form field name.
     * @param event {object} event object getting populated when the input field value getting changed.
     */
    const inputElementOnFocusCallback = (loginFormFieldName: string, event: ChangeEvent<HTMLInputElement>): void => {
        console.log(
            `VirtualKeyboardModalDemo : inputElementOnFocusCallback : Getting focus in the ${loginFormFieldName} field value=`,
            event.target.value,
        );
        setInputFieldName(event.target.id);
        setInputFieldType(event.target.type);
        setInputFieldValue(event.target.value);
        setKeyboardModalOpenState(true);
        if (event.target.id === firstInputFieldName) {
            firstInputFieldRef.blur();
            setInputFieldLabel(firstInputFieldLabel);
        }
    };

    return (
        <>
            Username :
            <input
                id={firstInputFieldName}
                type={firstInputFieldType}
                value={inputFieldValue}
                ref={(reference) => (firstInputFieldRef = reference)}
                onFocus={(event) => inputElementOnFocusCallback(firstInputFieldName, event)}
                onChange={(event) => {
                    console.log(
                        `VirtualKeyboardModalDemo : onChange callback for inputField = ${firstInputFieldName} value=`,
                        event.target.value,
                    );
                }}
            />
            <VirtualKeyboardModal
                keyboardModalOpenState={keyboardModalOpenState}
                bindInputElementName={inputFieldName}
                bindInputElementType={inputFieldType}
                bindInputElementLabel={inputFieldLabel}
                bindInputElementValue={inputFieldValue}
                handleKeyboardModalClose={handleKeyboardModalCloseCallback}
                onChangeUpdateBindInputElementValue={changeInputValue}
            />
        </>
    );
};

export default VirtualKeyboardModalDemo;
