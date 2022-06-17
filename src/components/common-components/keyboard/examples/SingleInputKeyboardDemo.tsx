import { FunctionComponent, useState, ChangeEvent, useRef } from 'react';
import VirtualKeyboard from '../VirtualKeyboard';

// Input Field Identifier.
const inputFieldName = 'inputFieldIdentifier';

/**
 * This functional component used to test the integration of Virtual Keyboard,
 * with the application.
 * @returns Container with input field and custom keyboard.
 */
const SingleInputKeyboardDemo: FunctionComponent = () => {
    const keyboard: any = useRef(null);
    const [input, setInput] = useState('');

    /**
     * This function will be call back for the value change of the keyboard.
     * @param event event triggered from the onChange event for input element.
     */
    const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        // 1. Get the value from the keyboard.
        const input = event.target.value;
        // 2. Set the input in current state.
        setInput(input);
        // 3. Set the input for the current keyboard reference.
        keyboard.current.setInput(input);
    };

    return (
        <>
            <input id={inputFieldName} value={input} onChange={(e) => onInputChange(e)} />
            <VirtualKeyboard keyboardReference={keyboard} onChange={setInput} inputFieldName={inputFieldName} />
        </>
    );
};

export default SingleInputKeyboardDemo;
