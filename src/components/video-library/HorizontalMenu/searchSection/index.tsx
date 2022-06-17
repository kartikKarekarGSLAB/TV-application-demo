import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography/Typography';
import { ChangeEvent, useRef, useState } from 'react';
import InputField from '../../../common-components/input-field/InputField';
import VirtualKeyboardModal from '../../../common-components/keyboard/modal/VirtualKeyboardModal';

/**
 * @interface ContentBannerSectionProps this is the type used for the search asset section.
 * @property selectedAssetDetails {any} this hold the details needed for the banner section.
 */
interface ContentSearchSectionProps {
    selectedAssetDetails?: any;
}

const SEARCH_INPUT_FIELD_NAME = 'searchInputField';
/**
 * This is the functional component created for the search section
 * from the horizontal navigation.
 * @param param0 {ContentSearchSectionProps} search asset section properties
 * @returns banner section component.
 */
function ContentSearchSection(contentSearchSectionProps: ContentSearchSectionProps) {
    console.log('ContentSearchSection :: contentSearchSectionProps=', contentSearchSectionProps);

    /**
     * The virtual keyboard getting opened for the any input field.
     * To identify the input element associated along with the keyboard,
     * We needed to identify the inputFieldName, InputFileType and inputFiledValue.
     */
    const [inputFieldName, setInputFieldName] = useState(SEARCH_INPUT_FIELD_NAME);
    const [inputFieldLabel, setInputFieldLabel] = useState('');
    const [inputFieldType, setInputFieldType] = useState('');
    const [inputFieldValue, setInputFieldValue] = useState('');
    // References will be needed to set the focus away from the input field.
    const searchInputElementReference: any = useRef(null);
    // This is used to defined the state of the virtual keyboard
    const [keyboardModalOpenState, setKeyboardModalOpenState] = useState(false);

    /**
     * This function will be callback when the keyboard component Modal.
     * Get closed.
     */
    const handleKeyboardModalCloseCallback = () => {
        setKeyboardModalOpenState(false);
    };

    /**
     * This function will set the input element details for the keyboard.
     * This will show the keyboard, bind the input element for the keyboard.
     * It will also load the label into keyboard panel. It also make the input
     * element focus blurred.
     * @param event {ChangeEvent}
     */
    const virtualKeyboardOpenCallback = (event: ChangeEvent<HTMLInputElement>): void => {
        setInputFieldLabel('Search Term');
        setInputFieldName(event.target.id);
        setInputFieldType(event.target.type);
        setInputFieldValue(event.target.value);
        // This will open the keyboard modal.
        setKeyboardModalOpenState(true);
        if (searchInputElementReference && searchInputElementReference.current) {
            searchInputElementReference.current.blur();
        }
    };

    /**
     * This will be the callback function when the input field is changed.
     * @param loginFormFieldName {string} this will represent the form field name.
     * @param event {object} event object getting populated when the input field value getting changed.
     */
    const inputElementOnChangeCallback = (loginFormFieldName: string, event: ChangeEvent<HTMLInputElement>): void => {
        // 1. Get the value from the keyboard.
        const updatedInputFieldValue: string = event.target.value;
        console.log(
            'LogIn : handleChange field value updated loginFormFieldName= ',
            loginFormFieldName,
            ', value=',
            updatedInputFieldValue,
        );
        setInputFieldValue(updatedInputFieldValue);
    };

    /**
     * This will be the callback function when the input field is changed.
     * @param loginFormFieldName {string} this will represent the form field name.
     * @param event {object} event object getting populated when the input field value getting changed.
     */
    const inputElementOnKeyUpCallback = (loginFormFieldName: string, event: ChangeEvent<HTMLInputElement>): void => {
        // 1. Id of field getting updated.
        const updatedInputFieldId: string = event.target.id;
        console.log(
            'LogIn : inputElementOnKeyUpCallback field value updated, updatedInputFieldId= ',
            updatedInputFieldId,
            ', loginFormFieldName=',
            loginFormFieldName,
        );
    };
    /**
     * This function will get triggered when, we the input element will get focus.
     * It will set the keyboardFieldName, that will update the inputName property of virtual keyboard.
     * @param loginFormFieldName {string} this will represent the form field name.
     * @param event {object} event object getting populated when the input field value getting changed.
     */
    const inputElementOnFocusCallback = (loginFormFieldName: string, event: ChangeEvent<HTMLInputElement>): void => {
        console.log(
            'Search : inputElementOnFocusCallback : Getting focus in the field :: ',
            event.target.id,
            ', fieldName=',
            loginFormFieldName,
        );
        virtualKeyboardOpenCallback(event);
    };

    /**
     * This function will be callback for the keyboard modal. this will get execute when the keyboard input value getting updated.
     * @param loginFormFieldName {string} input field name/id for which the keyboard component updating the input value.
     * @param updatedInputFieldValue {string} updated input field value.
     */
    const onChangeUpdateBindInputElementValueCallback = (
        loginFormFieldName: string,
        updatedInputFieldValue: string,
    ) => {
        console.log(
            'Search : onChangeUpdateBindInputElementValueCallback : Updating the loginFormFieldName=',
            loginFormFieldName,
            ', with value =',
            updatedInputFieldValue,
        );
        setInputFieldValue(updatedInputFieldValue);
    };
    const searchFieldDetails = {
        formField: SEARCH_INPUT_FIELD_NAME,
        inputType: 'text',
        inputValue: inputFieldValue,
        isDisabled: false,
        inputReference: searchInputElementReference,
        placeholder: 'Add Search Term',
        onChangeCallback: inputElementOnChangeCallback,
        onFocusCallback: inputElementOnFocusCallback,
        onKeyUpCallback: inputElementOnKeyUpCallback,
        styleClass: 'search-input-field',
    };
    return (
        <Grid
            container
            sx={{
                margin: '1vh 1vh 1vh 5vh',
            }}
        >
            {/* This section hold the details of selected asset. */}
            <Typography variant="subtitle1">Search</Typography>
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                }}
            >
                <InputField fieldProperties={searchFieldDetails} />
            </Grid>
            <VirtualKeyboardModal
                keyboardModalOpenState={keyboardModalOpenState}
                handleKeyboardModalClose={handleKeyboardModalCloseCallback}
                onChangeUpdateBindInputElementValue={onChangeUpdateBindInputElementValueCallback}
                bindInputElementName={inputFieldName}
                bindInputElementLabel={inputFieldLabel}
                bindInputElementType={inputFieldType}
                bindInputElementValue={inputFieldValue}
            />
        </Grid>
    );
}

export { ContentSearchSection };
