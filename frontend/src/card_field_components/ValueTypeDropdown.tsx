import {SxProps, Theme} from "@mui/material";
import React, {forwardRef, useImperativeHandle} from "react";
import {useSelect} from "../hooks/SelectHook";
import {ValueType} from "../views/ValueTypes";

export interface ValueTypeDropdownRef {
    getValueType(): ValueType | null;
}

export interface ValueTypeDropdownProps {
    label: string;
    sx?: SxProps<Theme>
}

export const ValueTypeDropdown = forwardRef<ValueTypeDropdownRef, ValueTypeDropdownProps>(
    ({label, sx}: ValueTypeDropdownProps, ref) => {
        const [selection, getSelect] = useSelect(label);

        useImperativeHandle(ref, () => ({
            getValueType: () => mapping[selection] ?? null
        }));

        const mapping: {[key: string]: ValueType} = {
            "string": ValueType.String,
            "integer": ValueType.Integer,
            "integer_symbol": ValueType.IntegerSymbol,
            "float": ValueType.Float,
            "float_symbol": ValueType.FloatSymbol,
        }

        const options: [string, string][] = [
            ["string", "Text"],
            ["integer", "Integer"],
            ["integer_symbol", "Integer Symbol"],
            ["float", "Float"],
            ["float_symbol", "Float Symbol"],
        ]

        return <>
            {getSelect(() => options, sx)}
        </>
    });