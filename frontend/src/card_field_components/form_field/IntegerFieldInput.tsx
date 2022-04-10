import React, {forwardRef, useImperativeHandle} from "react";
import {FormFieldRef} from "./FormFieldRef";
import {useInput} from "../../hooks/InputHook";
import {Stack, TextField} from "@mui/material";
import {ValueFieldInput} from "./ValueFieldInput";

export interface NumberFieldInputProps extends ValueFieldInput {
}

export const IntegerFieldInput = forwardRef<FormFieldRef, NumberFieldInputProps>(
    ({existingName}: NumberFieldInputProps, ref) => {
    const [name, setName] = useInput();
    const [value, setValue] = useInput(v => v.replaceAll(".", ""));

    useImperativeHandle(ref, () => ({
        getName: () => name,
        getValue: () => value,
    }));

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
                sx={{marginLeft: 1}}
            />
        </Stack>
    );
});