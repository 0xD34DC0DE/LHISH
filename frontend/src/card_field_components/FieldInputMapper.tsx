import {ValueType} from "../views/ValueTypes";
import {TextFieldInput} from "./form_field/TextFieldInput";
import {IntegerFieldInput} from "./form_field/IntegerFieldInput";
import {FloatFieldInput} from "./form_field/FloatFieldInput";
import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {FormFieldRef} from "./form_field/FormFieldRef";
import {IntegerSymbolFieldInput} from "./form_field/IntegerSymbolFieldInput";

export interface FieldInputMapperRef {
    getValue: () => { name: string, value: string } | null;
}

export interface FieldInputMapperProps {
    valueType: ValueType;
    name: string | null;
}

export const FieldInputMapper = forwardRef<FieldInputMapperRef, FieldInputMapperProps>(
    ({valueType, name}: FieldInputMapperProps, ref) => {
        const inputRef = useRef<FormFieldRef>(null);

        useImperativeHandle(ref, () => ({
            getValue: () => {
                if (inputRef.current) {
                    return {
                        name: inputRef.current.getName(),
                        value: inputRef.current.getValue()
                    }
                }
                return null;
            }
        }));

        const getProps = () => {
            return {
                existingName: name ?? null,
                ref: inputRef
            }
        }

        return (
            <>
                {valueType === ValueType.String && <TextFieldInput {...getProps()}/>}
                {valueType === ValueType.Integer && <IntegerFieldInput {...getProps()}/>}
                {valueType === ValueType.Float && <FloatFieldInput {...getProps()}/>}
                {valueType === ValueType.IntegerSymbol && <IntegerSymbolFieldInput {...getProps()}/>}
                {valueType === ValueType.FloatSymbol && <></>}
                {valueType === ValueType.File && <></>}
                {valueType === ValueType.Image && <></>}
            </>
        );
    }
);