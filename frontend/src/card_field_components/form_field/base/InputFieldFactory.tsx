import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {useAuthGet} from "../../../hooks/QueryHooks";
import {Stack, Typography} from "@mui/material";
import {FieldInputMapper, FieldInputMapperRef} from "./FieldInputMapper";
import {ValueType, valueTypeFromString} from "../../ValueTypes";
import {Field} from "../../Fields";

export interface InputFieldFactoryRef {
    getFields: () =>  (Field | null)[];
    addField: (valueType: ValueType, existingName?: string) => void;
    validate: () => boolean;
}

export interface InputFieldFactoryProps {
    templateId?: string | null;
    onFieldsChange: (fields: (Field | null)[]) => void;
    setError: (error: string | null) => void;
}

export interface Template {
    name: string;
    type: ValueType;
    value: any;
}

export const InputFieldFactory = forwardRef<InputFieldFactoryRef, InputFieldFactoryProps>(
    ({templateId = null, onFieldsChange, setError}: InputFieldFactoryProps, ref) => {
        const [getTemplate, template, error, reset] = useAuthGet<Template[]>(
            () => `http://localhost:8080/template/${templateId}`
        );
        const refs = useRef<(FieldInputMapperRef | null)[]>([]);
        const [fields, setFields] = useState<React.ReactElement[]>([]);

        const getFields = () => {
            return refs.current.map(ref => ref?.getField() ?? null);
        };

        const onFieldChange = () => {
            onFieldsChange(getFields())
        };

        useImperativeHandle(ref, () => ({
            getFields: getFields,
            addField: (valueType: ValueType, name: string | null = null) => {
                refs.current.push(null);
                let index = refs.current.length - 1;
                setFields(
                    [...fields,
                        <FieldInputMapper
                            key={index}
                            valueType={valueType}
                            name={name}
                            ref={ref => refs.current[index] = ref}
                            onFieldChange={onFieldChange}
                        />
                    ]
                );
            },
            validate: () => {
                if(getFields().some(v => v === null))
                {
                    setError("Some fields are missing");
                    return false;
                }
                return true;
            }
        }));

        useEffect(() => {
            if (templateId) {
                getTemplate();
            }
        }, [templateId]);

        useEffect(() => {
            if (template) {
                setFields(() => getFieldElements());
            }
        }, [template]);

        const getFieldElements = (): React.ReactElement[] => {
            if (template) {
                return template.map((template: Template, index) => {
                    return <FieldInputMapper
                        key={index}
                        valueType={valueTypeFromString(template.type)}
                        name={template.name ?? "MISSING NAME"}
                        value={template.value}
                        ref={(element) => {
                            refs.current[index] = element
                        }}
                        onFieldChange={onFieldChange}
                    />
                });
            }
            return [];
        }

        return (
            <Stack>
                {fields}
            </Stack>
        );
    });