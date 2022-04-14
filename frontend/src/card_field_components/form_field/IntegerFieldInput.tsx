import React, {forwardRef, useEffect, useImperativeHandle} from "react";
import {FormFieldRef} from "./base/FormFieldRef";
import {useInput} from "../../hooks/InputHook";
import {Stack, TextField} from "@mui/material";
import {ValueFieldInput} from "./base/ValueFieldInput";
import {ValueType} from "../ValueTypes";
import {useValidation} from "../../hooks/ValidationHook";
import {Field} from "../Fields";

export interface NumberFieldInputProps extends ValueFieldInput {
}

export const IntegerFieldInput = forwardRef<FormFieldRef, NumberFieldInputProps>(
    ({existingName, onFieldChange}: NumberFieldInputProps, ref) => {
        const [name, setName] = useInput();
        const [value, setValue] = useInput(v => v.replaceAll(".", ""));

        const [nameValidation, nameErrorProps] = useValidation(() => name === "" ? "Name is required" : null);
        const [valueValidation, valueErrorProps] = useValidation(
            () => isNaN(parseInt(value)) ? "Value is required" : null
        );

        useImperativeHandle(ref, () => ({
            getField: getField
        }));

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
                type: ValueType.INTEGER,
                name: name,
                value: parseInt(value)
            };
        }

        useImperativeHandle(ref, () => ({
            getField: getField
        }));

        useEffect(() => {
            if(!isValid(true)) {
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
                    value={name}
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
                    type="number"
                    value={value}
                    fullWidth
                    onChange={setValue}
                    {...valueErrorProps}
                    sx={{marginLeft: 1}}
                />
            </Stack>
        );
    }
);