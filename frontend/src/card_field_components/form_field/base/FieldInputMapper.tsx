import {ValueType} from "../../ValueTypes";
import {TextFieldInput} from "../TextFieldInput";
import {IntegerFieldInput} from "../IntegerFieldInput";
import {FloatFieldInput} from "../FloatFieldInput";
import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {FormFieldRef} from "./FormFieldRef";
import {IntegerSymbolFieldInput} from "../IntegerSymbolFieldInput";
import {Field} from "../../Fields";
import {FloatSymbolFieldInput} from "../FloatSymbolFieldInput";

export interface FieldInputMapperRef {
    getField: () => Field | null;
}

export interface FieldInputMapperProps {
    valueType: ValueType;
    name: string | null;
    index: number;
    onFieldChange: (field: Field, index: number) => void;
}

export const FieldInputMapper = forwardRef<FieldInputMapperRef, FieldInputMapperProps>(
    ({valueType, name, onFieldChange, index}: FieldInputMapperProps, ref) => {
        const inputRef = useRef<FormFieldRef>(null);

        useImperativeHandle(ref, () => ({
            getField: () => {
                if (inputRef.current) {
                    return inputRef.current.getField();
                }
                return null;
            }
        }));

        const getProps = () => {
            return {
                existingName: name ?? null,
                ref: inputRef,
                onFieldChange: (field: Field) => {
                    onFieldChange(field, index);
                }
            }
        }

        return (
            <>
                {valueType === ValueType.STRING && <TextFieldInput {...getProps()}/>}
                {valueType === ValueType.INTEGER && <IntegerFieldInput {...getProps()}/>}
                {valueType === ValueType.FLOAT && <FloatFieldInput {...getProps()}/>}
                {valueType === ValueType.INTEGER_SYMBOL && <IntegerSymbolFieldInput {...getProps()}/>}
                {valueType === ValueType.FLOAT_SYMBOL && <FloatSymbolFieldInput {...getProps()}/>}
                {valueType === ValueType.FILE && <></>}
                {valueType === ValueType.IMAGE && <></>}
            </>
        );
    }
);