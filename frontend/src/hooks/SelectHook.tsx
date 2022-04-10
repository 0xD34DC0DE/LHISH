import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SxProps, Theme} from "@mui/material";
import React, {useState} from "react";

type optionArgs = () => [string, string][];
type optionFunc = (options: optionArgs, sx?: SxProps<Theme>) => React.ReactElement;

export const useSelect = (label: string, initialValue?: string, defaultValue?: string):
    [string, optionFunc] => {
    const [selection, setSelection] = useState<string>(initialValue ?? "");

    const handleChange = (e: SelectChangeEvent) => {
        setSelection(e?.target.value ?? "");
    };

    const getId = () => {
        return label.replace(/\s/g, "_").toLowerCase();
    };

    const getSelect = (options: () => [string, string][], sx?: SxProps<Theme>) => (
        <FormControl fullWidth sx={{marginTop: 1, marginBottom: 1}}>
            <InputLabel id={`${getId()}-id-select-label`}>{label}</InputLabel>
            <Select
                labelId={`${getId()}-id-select-label`}
                id={`${getId()}-id-select`}
                value={selection}
                label={label}
                defaultValue={defaultValue}
                onChange={handleChange}
                sx={sx}
            >
                {options().map(pair => (
                    <MenuItem key={pair[0]} value={pair[0]}>{pair[1]}</MenuItem>
                ))}
            </Select>
        </FormControl>);

    /*
    *
    * */

    return [selection, getSelect];
}