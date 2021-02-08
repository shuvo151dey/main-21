import {TextField, Button, InputAdornment, InputLabel, Select, FormControl, MenuItem} from '@material-ui/core';

export const OptionField = ({options=[], label, value, handleChange, handleBlur, name, error, className}) => {
    return (
        <FormControl variant="outlined" className={className}>
            <InputLabel>{label}</InputLabel>
            <Select
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                label={label}
                error={error}
            >
                {
                    options.map((item, index) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}