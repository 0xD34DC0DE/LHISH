import React, {useState} from "react";
import {SelectChangeEvent} from "@mui/material";

export const useInput = (filter?: (value: string) => string):
    [
        string,
        (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent) => void,
        (newValue: string) => void
    ] => {
    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent) => {
        let newValue = e.target.value;
        if (filter) {
            newValue = filter(newValue);
            e.target.value = newValue;
        }
        setValue(newValue);
    };

    const overrideValue = (newValue: string) => {
        setValue(newValue);
    };

    return [value, handleChange, overrideValue];
};