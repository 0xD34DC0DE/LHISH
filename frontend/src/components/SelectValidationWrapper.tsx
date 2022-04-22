import React, {forwardRef, FunctionComponent, useEffect, useImperativeHandle} from "react";
import {FormControl, FormHelperText, InputLabel, SxProps} from "@mui/material";
import {useValidation} from "../hooks/ValidationHook";
import {useInput} from "../hooks/InputHook";

export interface SelectValidationWrapperRef {
    validate: () => boolean;
}

export interface SelectValidationWrapperProps {
    validator: () => string | null;
    setValue: (value: string) => void;
    label: string;
    children: React.ReactNode;
    sx?: SxProps;
    fullWidth?: boolean;
    setError: (error: string | null) => void;
}

export const SelectValidationWrapper = forwardRef<SelectValidationWrapperRef, SelectValidationWrapperProps>(
    ({
         children,
         sx,
         validator,
         label,
         setValue,
         fullWidth,
         setError
     }, ref) => {
        const [value, valueSetter] = useInput()
        const [validation, errorProps] = useValidation(validator);

        useEffect(() => {
            setValue(value);
        }, [value])

        useImperativeHandle(ref, () => ({
            validate: () => {
                return validation();
            }
        }));

        const getId = () => {
            let name = label.toLowerCase().replaceAll(' ', '');
            return `${name}-id-select`;
        }

        const getLabelId = () => {
            return `${getId()}-label`;
        }

        const getChildWithProps = () => {
            if (React.isValidElement(children)) {
                return React.cloneElement(children, {
                    onFocus: errorProps.onFocus,
                    value: value,
                    onChange: valueSetter,
                    id: getId(),
                    labelId: getLabelId(),
                    label: label,
                });
            }
            return null;
        }

        return (
            <FormControl fullWidth sx={sx} error={errorProps.error}>
                <InputLabel id={getLabelId()}>{label}</InputLabel>
                {getChildWithProps()}
                {errorProps.error &&
                    <FormHelperText>{errorProps.helperText}</FormHelperText>
                }
            </FormControl>
        );
    }
);