import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {useAuthGet} from "../hooks/QueryHooks";
import {Stack} from "@mui/material";
import {FieldInputMapper, FieldInputMapperRef} from "./FieldInputMapper";
import {ValueType} from "../views/ValueTypes";

export interface InputFieldFactoryRef {
    getValues: () => ({ name: string, value: string } | null) [];
    addField: (valueType: ValueType, existingName?: string) => void;
}

export interface InputFieldFactoryProps {
    templateId?: string | null;
}

export interface Template {
    name: string;
    valueType: ValueType;
}

export const InputFieldFactory = forwardRef<InputFieldFactoryRef, InputFieldFactoryProps>(
    ({templateId = null}: InputFieldFactoryProps, ref) => {
        const [getTemplate, template, error, reset] = useAuthGet<Template[]>(
            () => `http://localhost:8080/template/${templateId}`
        );
        const refs = useRef<(FieldInputMapperRef | null)[]>([]);
        const [fields, setFields] = useState<React.ReactElement[]>([]);

        useImperativeHandle(ref, () => ({
            getValues: () => {
                return refs.current.map(ref => ref?.getValue() ?? null);
            },
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
                        />
                    ]
                );
            }
        }));

        useEffect(() => {
            if (templateId) {
                getTemplate();
            }
        }, [templateId]);

        useEffect(() => {
            if (template) {
                setFields(getFields());
            }
        }, [template]);

        const getFields = (): React.ReactElement[] => {
            if (template) {
                return template.map((template: Template, index) => {
                    return <FieldInputMapper
                        key={index}
                        valueType={template.valueType}
                        name={template.name ?? "MISSING NAME"}
                        ref={(element) => {
                            refs.current[index] = element
                        }}
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