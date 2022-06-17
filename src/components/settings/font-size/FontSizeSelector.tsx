import { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setApplicationFontSizePreference } from './../../../actions/appActions';

function FontSizeSelector() {
    const dispatch = useDispatch();
    const [fontSize, setFontSize] = useState('medium');

    const handleFontSizeChange = (event: any) => {
        const fontSize = event.target.value;
        dispatch(setApplicationFontSizePreference(fontSize));
        setFontSize(fontSize);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="font-size-options-label">Font Size</InputLabel>
                <Select
                    labelId="font-size-options-label"
                    id="font-size-options"
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    autoWidth
                    label="Font Size"
                >
                    <MenuItem value="small">Small</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="large">Large</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default FontSizeSelector;
