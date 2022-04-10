import React, {forwardRef, useImperativeHandle} from "react";
import {Stack, TextField} from "@mui/material";
import {FieldInput} from "./FieldInput";
import {useInput} from "../../hooks/InputHook";
import {FormFieldRef} from "./FormFieldRef";
import {ValueFieldInput} from "./ValueFieldInput";

export interface TextFieldInputProps extends ValueFieldInput {
}

export const TextFieldInput = forwardRef<FormFieldRef, TextFieldInputProps>(
    ({existingName}: TextFieldInputProps, ref) => {
    const [name, setName] = useInput();
    const [value, setValue] = useInput();

    useImperativeHandle(ref, () => ({
        getName: () => name,
        getValue: () => value,
    }));

    return (
        <Stack direction={"row"}>
            <TextField
                margin="dense"
                id="name"
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
                type="text"
                fullWidth
                onChange={setValue}
                sx={{marginLeft: 1}}
            />
        </Stack>
    );
});