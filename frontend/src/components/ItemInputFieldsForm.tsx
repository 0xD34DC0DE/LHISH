import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, Stack, TextField} from "@mui/material";
import {ValueTypeDropdown, ValueTypeDropdownRef} from "../card_field_components/form_field/base/ValueTypeDropdown";
import {InputFieldFactory, InputFieldFactoryRef} from "../card_field_components/form_field/base/InputFieldFactory";
import {TemplateDropDown, TemplateDropDownRef} from "./TemplateDropDown";
import {Field, IntegerSymbolField} from "../card_field_components/Fields";
import {useAuthPost} from "../hooks/QueryHooks";
import {useValidation} from "../hooks/ValidationHook";
import {useInput} from "../hooks/InputHook";

export interface ItemInputFieldsFormRef {
    createTemplate: () => void;
    validate: () => boolean;
}

export interface ItemInputFieldsFormProps {
    setError: (error: string | null) => void;
    onFieldsChange: (fields: (Field | null)[]) => void;
    onTemplateCreated: (templateId: string) => void;
}

export const ItemInputFieldsForm = forwardRef<ItemInputFieldsFormRef, ItemInputFieldsFormProps>(
    ({setError, onFieldsChange, onTemplateCreated}: ItemInputFieldsFormProps, ref) => {
        const valueTypeDropdownRef = useRef<ValueTypeDropdownRef>(null);
        const [existingTemplate, setExistingTemplate] = useState<boolean>(false);

        const [fields, setFields] = useState<(Field | null)[]>([]);
        const fieldFactoryRef = useRef<InputFieldFactoryRef>(null);

        const [templateId, setTemplateId] = useState<string | null>(null);
        const templateDropDownRef = useRef<TemplateDropDownRef>(null);

        const [templateName, setTemplateName] = useInput();
        const [templateNameValidation, templateNameErrorProps] = useValidation(
            () => {
                if (existingTemplate) {
                    return null;
                }
                return templateName === "" ? "Name is required" : null
            }
        );

        const [postTemplate, templateData, templateError, templateReset] = useAuthPost<string>(
            "http://localhost:8080/template/create"
        );

        const mapFieldObject = (field: Field | null) => {
            if(field === null) {
                return null;
            }
            const {name, type, ...values} = field;
            return {
                name,
                type,
                values: values
            }
        };

        useImperativeHandle(ref, () => ({
            createTemplate: () => {
                postTemplate(
                    ["name", templateName],
                    ["isNewTemplate", !existingTemplate],
                    ["fields", fields.filter(f => f !== null).map(mapFieldObject)]
                );
            },
            validate: () => {
                if (existingTemplate) {
                    if (!templateDropDownRef.current?.validate()) {
                        return false;
                    }
                } else {
                    if (!templateNameValidation()) {
                        setError("Template name is required");
                        return false;
                    }
                }
                return fieldFactoryRef.current?.validate() ?? false;
            }
        }));

        useEffect(() => {
            templateReset();
        }, [])

        useEffect(() => {
            if (templateData) {
                onTemplateCreated(templateData);
            }
        }, [templateData]);

        useEffect(() => {
            if (templateError) {
                setError(templateError);
            }
        }, [templateError]);

        const updateField = () => {
            setFields((fields: (Field | null)[]) => {
                const updatedFields = fieldFactoryRef.current?.getFields() ?? [];
                onFieldsChange(updatedFields);
                return updatedFields;
            });
        }

        const addField = () => {
            let fieldType = valueTypeDropdownRef.current?.getValueType() ?? null;
            if (fieldType !== null) {
                fieldFactoryRef.current?.addField(fieldType);
                setFields(fields.concat([null]));
            }
        }

        return (
            <Grid item xs={5}>
                <FormControlLabel
                    label="Existing template"
                    control={
                        <Checkbox
                            value={existingTemplate}
                            onChange={
                                (e: React.ChangeEvent<HTMLInputElement>) =>
                                    setExistingTemplate(e.target.checked)
                            }
                        />
                    }
                />
                {!existingTemplate && <Stack>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="template-name"
                        label="Template name"
                        type="text"
                        fullWidth
                        onChange={setTemplateName}
                        {...templateNameErrorProps}
                    />
                    <Stack direction={"row"}>
                        <ValueTypeDropdown
                            label={"Type to add"}
                            sx={{display: "inline"}}
                            ref={valueTypeDropdownRef}
                        />
                        <Button variant={"contained"}
                                sx={{marginLeft: 1, marginTop: 1, marginBottom: 1}}
                                onClick={addField}
                        >Add</Button>
                    </Stack>
                    <InputFieldFactory
                        onFieldsChange={updateField}
                        setError={setError}
                        ref={fieldFactoryRef}
                    />
                    <Button onClick={() => {
                        console.log(fieldFactoryRef.current?.getFields())
                    }}>TEST</Button>
                </Stack>}
                {existingTemplate &&
                    <Stack>

                        <TemplateDropDown
                            setTemplateId={setTemplateId}
                            setError={setError}
                            ref={templateDropDownRef}
                        />

                        <InputFieldFactory
                            templateId={templateId === "" ? null : templateId}
                            onFieldsChange={updateField}
                            setError={setError}
                            ref={fieldFactoryRef}
                        />
                    </Stack>
                }
            </Grid>
        );
    }
);