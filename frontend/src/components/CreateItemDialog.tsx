import DialogBase, {DialogBaseRef} from "./DialogBase"
import {
    Box,
    Button, Checkbox,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, FormControlLabel,
    Grid,
    InputLabel,
    Stack,
    TextField
} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {FileUploadButton} from "./FileUploadButton";
import {useAuthFormPost, useAuthPost} from "../hooks/QueryHooks";
import {ErrorMessage} from "./ErrorMessage";
import {SuccessMessage} from "./SucessMessage";
import {CategoryDropDown} from "./CategoryDropDown";
import {ItemCard} from "./ItemCard";
import {ValueTypeDropdown, ValueTypeDropdownRef} from "../card_field_components/form_field/base/ValueTypeDropdown";
import {InputFieldFactory, InputFieldFactoryRef} from "../card_field_components/form_field/base/InputFieldFactory";
import {Field} from "../card_field_components/Fields";
import {ValueType} from "../card_field_components/ValueTypes";
import {TemplateDropDown} from "./TemplateDropDown";
import {TemplateIdView} from "../views/TemplateIdView";

export interface CreateItemDialogProps {
    innerRef: React.ForwardedRef<DialogBaseRef>;
    onItemCreated: () => void;
}

export const CreateItemDialog = ({innerRef, onItemCreated}: CreateItemDialogProps) => {
    const [itemName, setItemName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [templateId, setTemplateId] = useState<string | null>(null);
    const [file, setFile] = useState<File>();
    const [canCreate, setCanCreate] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fieldFactoryRef = useRef<InputFieldFactoryRef>(null);
    const valueTypeDropdownRef = useRef<ValueTypeDropdownRef>(null);
    const [fields, setFields] = useState<(Field | null)[]>([]);
    const [existingTemplate, setExistingTemplate] = useState<boolean>(false);
    const [sendingNewTemplate, setSendingNewTemplate] = useState(false);
    const [templateName, setTemplateName] = useState("");

    const [postForm, formData, formError, formReset] = useAuthFormPost(
        "http://localhost:8080/item/create"
    );

    const [postTemplate, templateData, templateError, templateReset] = useAuthPost<TemplateIdView>(
        "http://localhost:8080/template/create"
    );

    useEffect(() => {
        if (!formError && formData) {
            onItemCreated();
        }
    }, [formData]);

    const onClose = () => {
        formReset();
        setCategoryId(null);
    }

    const onSubmit = () => {
        if (!canCreate) {
            setError("Item name, category and image are required");
            return;
        }

        if (!existingTemplate) {
            if(templateName === "") {
                setError("Template name is required");
                return;
            }

            setSendingNewTemplate(true);

            postTemplate(
                ["name", templateName],
                ["fields", fields.map(field => {
                    return {
                        name: field?.name,
                        type: field?.type,
                        value: null
                    }
                })]
            );
        } else {
            postTemplate(
                ["fields", fields.map(field => {
                    return {
                        name: field?.name,
                        type: field?.type,
                        value: field?.value
                    }
                })]
            );
        }
    }

    useEffect(() => {
        if (!templateError && templateData && templateData.id !== "") {

            if (sendingNewTemplate) {
                setSendingNewTemplate(false);

                postTemplate(
                    ["fields", fields.map(field => {
                        return {
                            name: field?.name,
                            type: field?.type,
                            value: field?.value
                        }
                    })]
                );
                return;
            }

            postForm(
                ["name", itemName],
                ["description", description ?? ""],
                ["image", file],
                ["categoryId", categoryId],
                ["templateId", templateData.id]
            );
        } else {
            setError("Failed to create template");
        }
    }, [templateData]);

    useEffect(() => {
        setError(null);
        setCanCreate([itemName, categoryId, file].every(x => x !== null));
    }, [categoryId, itemName, file]);

    useEffect(() => {
        setError(formError);
    }, [formError]);

    const addField = () => {
        let fieldType = valueTypeDropdownRef.current?.getValueType() ?? null;
        if (fieldType !== null) {
            fieldFactoryRef.current?.addField(fieldType);
            setFields(fields.concat([null]));
        }
    }

    const updateField = (field: Field, index: number) => {
        setFields(f => {
            let updatedFields = [...f];
            updatedFields[index] = field;
            return updatedFields;
        });
    }

    //TODO toggle switch for batch mode: preserve template and clear fields

    return (
        <DialogBase ref={innerRef} fullWidth maxWidth={"xl"} onClose={onClose}>
            <DialogTitle>Create Item</DialogTitle>
            <DialogContent>
                <Grid container direction={"row"} spacing={2} justifyContent={"space-around"}>
                    <Grid item xs={3}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Item Name"
                            type="text"
                            fullWidth
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItemName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Description"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                        />
                        <FormControl fullWidth sx={{marginTop: 1, marginBottom: 1}}>
                            <InputLabel id="category-id-select-label">Category</InputLabel>
                            <CategoryDropDown setError={setError} setCategoryId={setCategoryId}/>
                        </FormControl>
                        <FileUploadButton
                            onFileChanged={setFile}
                            accept={"image/*"}
                            id={"image-upload"}
                            label={"Upload image"}
                        />
                    </Grid>
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
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemplateName(e.target.value)}
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
                                ref={fieldFactoryRef}
                            />
                            <Button onClick={() => {
                                console.log(fieldFactoryRef.current?.getFields())
                            }}>TEST</Button>
                        </Stack>}
                        {existingTemplate &&
                            <Stack>
                                <FormControl fullWidth sx={{marginTop: 1, marginBottom: 1}}>
                                    <InputLabel id="template-id-select-label">Template</InputLabel>
                                    <TemplateDropDown setTemplateId={setTemplateId} setError={setError}/>
                                </FormControl>
                            </Stack>
                        }
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{width: "100%"}}>
                            <ItemCard
                                onDelete={() => {
                                }}
                                name={itemName ?? "Example"}
                                description={description ?? "Description"}
                                imageId={""}
                                historyId={""}
                                fields={fields}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Box sx={{marginLeft: 2, marginRight: "auto"}}>

                    <SuccessMessage enabled={formData != null}>Item: "{itemName}" created</SuccessMessage>

                    <ErrorMessage enabled={error != null}>
                        Could not create item {itemName} <br/>Reason: {error}
                    </ErrorMessage>

                </Box>
                <Button onClick={onSubmit}>Create</Button>
            </DialogActions>

        </DialogBase>)
}