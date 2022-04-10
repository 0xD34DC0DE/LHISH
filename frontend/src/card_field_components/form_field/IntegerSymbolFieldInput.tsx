import {ValueFieldInput} from "./ValueFieldInput";
import React, {forwardRef, useImperativeHandle} from "react";
import {FormFieldRef} from "./FormFieldRef";
import {useInput} from "../../hooks/InputHook";
import {InputAdornment, Stack, TextField} from "@mui/material";


export interface IntegerSymbolFieldInputProps extends ValueFieldInput {
    existingSymbol?: string | null;
}

export const IntegerSymbolFieldInput = forwardRef<FormFieldRef, IntegerSymbolFieldInputProps>(
    ({existingName, existingSymbol = null}: IntegerSymbolFieldInputProps, ref) => {
        const [name, setName] = useInput();
        const [value, setValue] = useInput(v => v.replaceAll(".", ""));
        const [symbol, setSymbol] = useInput();

        useImperativeHandle(ref, () => ({
            getName: () => name,
            getValue: () => value + symbol, //TODO temporary
        }));

        const getEndAdornment = () => {
            return existingSymbol ? <InputAdornment position="start">{existingSymbol}</InputAdornment> : null;
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
                    sx={{marginLeft: 1, marginRight: 1}}
                />
                {!existingSymbol && <TextField
                    margin="dense"
                    id="symbol"
                    label="Symbol"
                    type="text"
                    value={symbol}
                    sx={{marginLeft: 1}}
                    onChange={setSymbol}
                />}
            </Stack>
        );
    });