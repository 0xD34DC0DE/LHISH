import {SxProps, Theme} from "@mui/material";
import React, {forwardRef, useImperativeHandle} from "react";
import {useSelect} from "../../../hooks/SelectHook";
import {ValueType} from "../../ValueTypes";

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
            "string": ValueType.STRING,
            "integer": ValueType.INTEGER,
            "integer_symbol": ValueType.INTEGER_SYMBOL,
            "float": ValueType.FLOAT,
            "float_symbol": ValueType.FLOAT_SYMBOL,
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