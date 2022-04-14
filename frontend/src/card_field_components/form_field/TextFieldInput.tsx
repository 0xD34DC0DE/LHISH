import React, {forwardRef, useEffect, useImperativeHandle} from "react";
import {Stack, TextField} from "@mui/material";
import {useInput} from "../../hooks/InputHook";
import {FormFieldRef} from "./base/FormFieldRef";
import {ValueFieldInput} from "./base/ValueFieldInput";
import {ValueType} from "../ValueTypes";
import {useValidation} from "../../hooks/ValidationHook";
import {Field} from "../Fields";

export interface TextFieldInputProps extends ValueFieldInput {
}

export const TextFieldInput = forwardRef<FormFieldRef, TextFieldInputProps>(
    ({existingName, onFieldChange}: TextFieldInputProps, ref) => {
        const [name, setName] = useInput();
        const [value, setValue] = useInput();
        const [nameValidation, nameErrorProps] = useValidation(() => name === "" ? "Name is required" : null);
        const [valueValidation, valueErrorProps] = useValidation(
            () => value === "" ? "Value is required" : null
        );

        const isValid = (skipErrorMessage: boolean = false) => {
            return [
                nameValidation(skipErrorMessage),
                valueValidation(skipErrorMessage)
            ].every(v => v);
        }

        const getField = (): Field | null => {
            if (!isValid()) {
                return null;
            }
            return {
                type: ValueType.STRING,
                name: name,
                value: value,
            };
        }

        useImperativeHandle(ref, () => ({
            getField: getField
        }));

        useEffect(() => {
            if(!isValid(true)){
                return;
            }
            let field = getField();
            if (field !== null) {
                onFieldChange(field);
            }
        }, [name, value]);

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
                    {...nameErrorProps}
                    sx={{marginRight: 1}}
                />
                <TextField
                    margin="dense"
                    id="value"
                    label="Value"
                    type="text"
                    fullWidth
                    onChange={setValue}
                    {...valueErrorProps}
                    sx={{marginLeft: 1}}
                />
            </Stack>
        );
    }
);