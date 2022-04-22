import {ValueFieldInput} from "./base/ValueFieldInput";
import React, {forwardRef, useEffect, useImperativeHandle} from "react";
import {FormFieldRef} from "./base/FormFieldRef";
import {useInput} from "../../hooks/InputHook";
import {InputAdornment, Stack, TextField} from "@mui/material";
import {ValueType} from "../ValueTypes";
import {useValidation} from "../../hooks/ValidationHook";
import {Field} from "../Fields";

export interface IntegerSymbolFieldInputProps extends ValueFieldInput {
}

export const IntegerSymbolFieldInput = forwardRef<FormFieldRef, IntegerSymbolFieldInputProps>(
    ({existingName, existingValue = null, onFieldChange}: IntegerSymbolFieldInputProps, ref) => {
        const [name, setName] = useInput();
        const [value, setValue] = useInput(v => v.replaceAll(".", ""));
        const [symbol, setSymbol] = useInput();

        const [nameValidation, nameErrorProps] = useValidation(() => {
            if(existingName) {
                return null;
            }
            return name === "" ? "Name is required" : null
        });
        const [valueValidation, valueErrorProps] = useValidation(
            () => isNaN(parseInt(value)) ? "Value is required" : null
        );
        const [symbolValidation, symbolErrorProps] = useValidation(
            () => {
                if(existingValue !== null && existingValue["symbol"]) {
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
            if (!isValid()) {
                return null;
            }
            return {
                type: ValueType.INTEGER_SYMBOL,
                name: existingName ?? name,
                value: parseInt(value),
                symbol: existingValue?.["symbol"] ?? symbol
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
        }, [name, value, symbol]);


        const getEndAdornment = () => {
            return existingValue?.["symbol"] ?
                <InputAdornment position="start">{existingValue["symbol"]}</InputAdornment> : null;
        }

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