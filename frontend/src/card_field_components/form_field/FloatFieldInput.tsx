import {ValueFieldInput} from "./base/ValueFieldInput";
import React, {forwardRef, useEffect, useImperativeHandle} from "react";
import {FormFieldRef} from "./base/FormFieldRef";
import {useInput} from "../../hooks/InputHook";
import {Stack, TextField} from "@mui/material";
import {ValueType} from "../ValueTypes";
import {useValidation} from "../../hooks/ValidationHook";
import {Field} from "../Fields";

export interface FloatFieldInputProps extends ValueFieldInput {
}

export const FloatFieldInput = forwardRef<FormFieldRef, FloatFieldInputProps>(
    ({existingName, onFieldChange}: FloatFieldInputProps, ref) => {
        const [name, setName] = useInput();
        const [value, setValue, overrideValue] = useInput();

        const [nameValidation, nameErrorProps] = useValidation(() => {
            if(existingName) {
                return null;
            }
            return name === "" ? "Name is required" : null
        });
        const [valueValidation, valueErrorProps] = useValidation(
            () => isNaN(parseFloat(value)) ? "Value is required" : null
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
                type: ValueType.FLOAT,
                name: existingName ?? name,
                value: parseFloat(value),
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
                onFieldChange();
            }
        }, [name, value]);

        const formatValue = (e: React.FocusEvent<HTMLInputElement>) => {
            if (value.indexOf('.') === -1) {
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
                    onBlur={formatValue}
                    {...valueErrorProps}
                    sx={{marginLeft: 1}}
                />
            </Stack>
        );
    });