import React, {useState} from "react";

export const useInput = (filter?: (value: string) => string):
    [
        string,
        (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
        (newValue: string) => void
    ] => {
    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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