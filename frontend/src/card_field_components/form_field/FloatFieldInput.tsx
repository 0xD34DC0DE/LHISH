import {ValueFieldInput} from "./ValueFieldInput";
import React, {forwardRef, useImperativeHandle} from "react";
import {FormFieldRef} from "./FormFieldRef";
import {useInput} from "../../hooks/InputHook";
import {Stack, TextField} from "@mui/material";

export interface FloatFieldInputProps extends ValueFieldInput {
}

export const FloatFieldInput = forwardRef<FormFieldRef, FloatFieldInputProps>(
    ({existingName}: FloatFieldInputProps, ref) => {
        const [name, setName] = useInput();
        const [value, setValue, overrideValue] = useInput();

        useImperativeHandle(ref, () => ({
            getName: () => name,
            getValue: () => value,
        }));

        const formatValue = (e: React.FocusEvent<HTMLInputElement>) => {
            console.log("overrideValue");
            if(value.indexOf('.') === -1) {
                overrideValue(value + '.0');
            }
        };

        return (
            <Stack direction={"row"}>
                <TextField
                    margin="dense"
                    id="name"
                    value={name}
                    label={existingName ?? "Name"}
                    disabled={existingName !== null}
                    type="text"
                    fullWidth
                    onChange={setName}
                    sx={{marginRight: 1}}
                />
                <TextField
                    margin="dense"
                    id="value"
                    label="Value"
                    type="number"
                    value={value}
                    fullWidth
                    onChange={setValue}
                    onBlur={formatValue}
                    sx={{marginLeft: 1}}
                />
            </Stack>
        );
    });