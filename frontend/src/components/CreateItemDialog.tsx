import DialogBase, {DialogBaseRef} from "./DialogBase"
import {Box, Button, DialogActions, DialogContent, DialogTitle, Grid} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {useAuthFormPost} from "../hooks/QueryHooks";
import {ErrorMessage} from "./ErrorMessage";
import {SuccessMessage} from "./SucessMessage";
import {Field} from "../card_field_components/Fields";
import {ItemBasicData, ItemBasicDataForm, ItemBasicDataFormRef} from "./ItemBasicDataForm";
import {ItemInputFieldsForm, ItemInputFieldsFormRef} from "./ItemInputFieldsForm";
import {PreviewItemCard} from "./PreviewItemCard";

export interface CreateItemDialogProps {
    innerRef: React.ForwardedRef<DialogBaseRef>;
    onItemCreated: () => void;
}

export const CreateItemDialog = ({innerRef, onItemCreated}: CreateItemDialogProps) => {
    const [error, setError] = useState<string | null>(null);

    const itemBasicDataFormRef = useRef<ItemBasicDataFormRef>(null);
    const [itemBasicData, setItemBasicData] = useState<ItemBasicData | null>(null);

    const itemInputFieldsFormRef = useRef<ItemInputFieldsFormRef>(null);
    const [fields, setFields] = useState<(Field | null)[]>([]);

    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const [postForm, formData, formError, formReset] = useAuthFormPost(
        "http://localhost:8080/item/create"
    );

    useEffect(() => {
        if (!formError && formData) {
            onItemCreated();
        }
    }, [formData]);

    const onClose = () => {
        formReset();
    }

    const createItem = () => {
        setError(null);

        if (!itemBasicDataFormRef.current?.validate()) {
            return;
        }

        if (!itemInputFieldsFormRef.current?.validate()) {
            return;
        }

        itemInputFieldsFormRef.current?.createTemplate();
    }

    const onTemplateCreated = (templateId: string) => {
        postForm(
            ["name", itemBasicData?.name],
            ["description", itemBasicData?.description ?? ""],
            ["image", itemBasicData?.image],
            ["categoryId", itemBasicData?.categoryId],
            ["templateId", templateId]
        );
    }

    useEffect(() => {
        if (formData) {
            onItemCreated();
        }
    }, [formData]);

    useEffect(() => {
        setError(formError);
    }, [formError]);

    useEffect(() => {
        setFields([]);
    }, []);

    const updateItemBasicData = (imageBasicData: ItemBasicData) => {
        setItemBasicData(imageBasicData);
        if (imageBasicData.image) {
            setImagePreviewUrl(URL.createObjectURL(imageBasicData.image))
        } else {
            setImagePreviewUrl(null);
        }
    };

    return (
        <DialogBase ref={innerRef} fullWidth maxWidth={"xl"} onClose={onClose}>
            <DialogTitle>Create Item</DialogTitle>
            <DialogContent>
                <Grid container direction={"row"} spacing={2} justifyContent={"space-around"}>
                    <ItemBasicDataForm
                        setError={setError}
                        setItemBasicData={updateItemBasicData}
                        ref={itemBasicDataFormRef}/>
                    <ItemInputFieldsForm
                        setError={setError}
                        onFieldsChange={setFields}
                        onTemplateCreated={onTemplateCreated}
                        ref={itemInputFieldsFormRef}/>
                    <Grid item xs={2}>
                        <Box sx={{width: "100%"}}>
                            <PreviewItemCard
                                name={itemBasicData?.name ?? null}
                                description={itemBasicData?.description ?? null}
                                fields={fields}
                                imageUrl={imagePreviewUrl}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Box sx={{marginLeft: 2, marginRight: "auto"}}>
                    <SuccessMessage enabled={formData != null}>Item: "{itemBasicData?.name}" created</SuccessMessage>
                    <ErrorMessage enabled={error != null}>
                        {error?.toString()}
                    </ErrorMessage>
                </Box>
                <Button onClick={createItem}>Create</Button>
            </DialogActions>

        </DialogBase>)
}