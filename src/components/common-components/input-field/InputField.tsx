import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import '../../../assets/styles/InputField.scss';

/**
 * @interface InputFieldProperties will be to generate the input field.
 * @property onChangeCallback {function(fieldName:string, event:object):string} This is the callback function passed from
 * the input field element’s when input field is change.
 * @property onFocusCallback {function(fieldName:string, event:object):string} This is the callback function passed from
 * input field element when input field got focus.
 * @property inputType {string} the type of input field type.
 * @property inputValue {string} the value of the input field. Optional property.
 * @property isDisabled {boolean} flag indicating wether the input field is disabled or not. Optional property.
 * @property placeholder {string} Placeholder string shown on the input field. Optional property.
 * @property styleClass {string} styling class getting added in the input field tag attribute. Optional property.
 * @property formField {string} field name. Optional property.
 * Note:: propertyName?: type; This indicate that this property is Optional.
 */
export interface InputFieldProperties {
    inputType: string;
    onChangeCallback: (fieldName: string, event: any) => void;
    onFocusCallback: (fieldName: string, event: any) => void;
    onKeyUpCallback: (fieldName: string, event: any) => void;
    inputReference?: any;
    inputValue?: string;
    isDisabled?: boolean;
    placeholder?: string;
    styleClass?: string;
    formField?: string;
}

/**
 * @type fieldPropertiesType type representing the field type.
 * @property fieldProperties {InputFieldProperties}
 */
type fieldPropertiesType = {
    fieldProperties: InputFieldProperties;
};

/**
 * This is the component created for generating the input field.
 * @param inputFieldProperties as object input for component
 * @returns input field tsx
 */
const InputField: FunctionComponent<fieldPropertiesType> = ({ fieldProperties }: fieldPropertiesType) => {
    const {
        inputType,
        inputValue,
        isDisabled,
        inputReference,
        placeholder,
        onChangeCallback,
        onFocusCallback,
        onKeyUpCallback,
        styleClass,
        formField,
    } = fieldProperties;

    console.log('InputField : generating the input element for inputType=', inputType);
    const [showPasswordIconToggle, setShowPasswordIconToggle] = useState(false);
    const [keyboardInputElementType, setKeyboardInputElementType] = useState(inputType);

    /**
     * This will be callback function for the show password icon added inside
     * the input element field. On click of it will toggle the input type and update
     * the show/hide password icon.
     */
    const handleClickShowPassword = () => {
        console.log(
            'InputField : handleClickShowPassword : setting the icons state as showPasswordIconToggle=',
            showPasswordIconToggle,
        );
        setShowPasswordIconToggle(!showPasswordIconToggle);
        setKeyboardInputElementType(showPasswordIconToggle ? 'text' : 'password');
    };

    /**
     * This function will be callback function getting added
     * when the mouseDownEvent getting trigged for the password type
     * input element.
     * @param event {MouseEvent} event instance.
     */
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    let showHidePasswordIcon = null;
    if (inputType === 'password') {
        showHidePasswordIcon = (
            <IconButton
                className="login-password-show-hide-icon"
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                mx-focusable="true"
            >
                {showPasswordIconToggle ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        );
    }
    return (
        <>
            <input
                id={`${formField}`}
                ref={inputReference}
                type={keyboardInputElementType}
                value={inputValue}
                className={'input-field ' + styleClass + (isDisabled ? 'input-field-disabled ' : '')}
                disabled={isDisabled}
                placeholder={placeholder}
                onChange={(e) => onChangeCallback(`${formField}`, e)}
                onFocus={(e) => onFocusCallback(`${formField}`, e)}
                onKeyUp={(event) => onKeyUpCallback(`${formField}`, event)}
            />
            {showHidePasswordIcon}
        </>
    );
};

export default InputField;
