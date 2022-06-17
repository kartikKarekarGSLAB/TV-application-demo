/**
 * NOTE: This demo aims to explain the basic behavior
 * You'll likely need to adapt it for your needs
 * Here's another example, in case you need it:
 * https://codesandbox.io/s/github/simple-keyboard/multiple-inputs-wrapper-router/tree/master/?file=/src/Home.js
 */
import { FunctionComponent, useState, ChangeEvent, useRef } from 'react';
import VirtualKeyboard from '../VirtualKeyboard';

// Input Field Identifier.
const firstInputFieldName = 'firstInputFieldNameIdentifier';
const secondInputFieldName = 'secondInputFieldNameIdentifier';

/**
 * This functional component used to test the integration of Virtual Keyboard,
 * with the application, with multiple input fields.
 * @returns Container with tow input field and custom keyboard.
 */
const MultipleInputKeyboardDemo: FunctionComponent = () => {
    const [inputs, setInputs]: any = useState({});
    const [inputName, setInputName] = useState('default');
    const keyboard: any = useRef();

    /**
     * Here we spread the inputs into a new object
     * If we modify the same object, react will not trigger a re-render
     * @param inputs {any} object getting stored in the state.
     */
    const onChangeAllCallback = (inputs: any): void => {
        setInputs({ ...inputs });
        console.log('MultipleInputKeyboardDemo : onChangeAllCallback : Inputs changed', inputs);
    };

    /**
     * This function will be call back for the value change of the keyboard.
     * @param event event triggered from the onChange event for input element.
     */
    const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        // 1. Get the value from the keyboard.
        const updatedInputValue = event.target.value;
        console.log(
            'MultipleInputKeyboardDemo : onInputChange : Input=',
            inputName,
            ', getting changed from (before update)=',
            inputs[inputName],
            ', to (after update) =',
            updatedInputValue,
        );
        // 2. Set the input in current state.
        setInputs({
            ...inputs,
            [inputName]: updatedInputValue,
        });
        // 3. Set the input for the current keyboard reference.
        keyboard.current.setInput(updatedInputValue);
    };

    /**
     * This will return the value to be read from the state.
     * @param inputName value of input from the state.
     * @returns value from the state.
     */
    const getInputValue = (inputName: string): string => {
        return inputs[inputName] || '';
    };

    return (
        <>
            <input
                id={firstInputFieldName}
                value={getInputValue(firstInputFieldName)}
                onFocus={() => setInputName(firstInputFieldName)}
                onChange={onInputChange}
            />
            <input
                id={secondInputFieldName}
                value={getInputValue(secondInputFieldName)}
                onFocus={() => setInputName(secondInputFieldName)}
                onChange={onInputChange}
            />
            <VirtualKeyboard
                keyboardReference={keyboard}
                onChangeAll={onChangeAllCallback}
                inputFieldName={inputName}
            />
        </>
    );
};

export default MultipleInputKeyboardDemo;
