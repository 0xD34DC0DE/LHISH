import {ValueFieldInput} from "./base/ValueFieldInput";
import React, {forwardRef, useEffect, useImperativeHandle} from "react";
import {FormFieldRef} from "./base/FormFieldRef";
import {useInput} from "../../hooks/InputHook";
import {useValidation} from "../../hooks/ValidationHook";
import {ValueType} from "../ValueTypes";
import {InputAdornment, Stack, TextField} from "@mui/material";
import {Field} from "../Fields";

export interface FloatSymbolFieldInputProps extends ValueFieldInput {
}

export const FloatSymbolFieldInput = forwardRef<FormFieldRef, FloatSymbolFieldInputProps>(
    ({existingName, existingValue = null, onFieldChange}: FloatSymbolFieldInputProps, ref) => {
        const [name, setName] = useInput();
        const [value, setValue, overrideValue] = useInput();
        const [symbol, setSymbol] = useInput();

        const [nameValidation, nameErrorProps] = useValidation(() => {
            if (existingName) {
                return null;
            }
            return name === "" ? "Name is required" : null
        });
        const [valueValidation, valueErrorProps] = useValidation(
            () => isNaN(parseFloat(value)) ? "Value is required" : null
        );
        const [symbolValidation, symbolErrorProps] = useValidation(
            () => {
                if (existingValue !== null && existingValue["symbol"]) {
                    return null;
                }
                return name === "" ? "Symbol is required" : null
            }
        );

        useImperativeHandle(ref, () => ({
            getField: getField
        }));

        const isValid = (skipErrorMessage: boolean = false) => {
            return [
                nameValidation(skipErrorMessage),
                valueValidation(skipErrorMessage),
                symbolValidation(skipErrorMessage)
            ].every(v => v);
        }

        const getField = (): Field | null => {
            if (!isValid(false)) {
                return null;
            }
            return {
                type: ValueType.FLOAT_SYMBOL,
                name: existingName ?? name,
                value: parseFloat(value),
                symbol: existingValue?.["symbol"] ?? symbol
            };
        }

        useImperativeHandle(ref, () => ({
            getField: getField
        }));

        useEffect(() => {
            if (!isValid(true)) {
                return;
            }
            let field = getField();
            if (field !== null) {
                onFieldChange();
            }
        }, [name, value, symbol]);

        const getEndAdornment = () => {
            return existingValue?.["symbol"] ?
                <InputAdornment position="start">{existingValue["symbol"]}</InputAdornment> : null;
        }

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
                    InputProps={{
                        endAdornment: getEndAdornment()
                    }}
                    onChange={setValue}
                    onBlur={formatValue}
                    {...valueErrorProps}
                    sx={{marginLeft: 1, marginRight: 1}}
                />
                {!existingValue && <TextField
                    margin="dense"
                    id="symbol"
                    label="Symbol"
                    type="text"
                    value={symbol}
                    onChange={setSymbol}
                    {...symbolErrorProps}
                    sx={{marginLeft: 1}}
                />}
            </Stack>
        );
    });