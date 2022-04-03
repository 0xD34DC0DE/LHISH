import DialogBase, {DialogBaseRef} from "./DialogBase"
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {FileUploadButton} from "./FileUploadButton";
import {useAuthFormPost} from "../hooks/QueryHooks";
import {ErrorMessage} from "./ErrorMessage";
import {SuccessMessage} from "./SucessMessage";
import {CategoryDropDown} from "./CategoryDropDown";

export interface CreateItemDialogProps {
    innerRef: React.ForwardedRef<DialogBaseRef>;
    onItemCreated: () => void;
}

export const CreateItemDialog = ({innerRef, onItemCreated}: CreateItemDialogProps) => {
    const [itemName, setItemName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [file, setFile] = useState<File>();
    const [canCreate, setCanCreate] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [postForm, formData, formError, formReset] = useAuthFormPost(
        "http://localhost:8080/item/create"
    );

    useEffect(() => {
        if (!formError) {
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
        postForm(
            ["name", itemName],
            ["description", description],
            ["image", file],
            ["categoryId", categoryId]
        );
    }

    useEffect(() => {
        setError(null);
        setCanCreate([itemName, categoryId, file].every(x => x !== null));
    }, [categoryId, itemName, file]);

    useEffect(() => {
        setError(formError);
    }, [formError]);

    return (
        <DialogBase ref={innerRef} fullWidth maxWidth={"sm"} onClose={onClose}>
            <DialogTitle>Create Item</DialogTitle>
            <DialogContent>
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
                <FileUploadButton onFileChanged={setFile} accept={"image/*"} id={"image-upload"}/>
            </DialogContent>

            <DialogActions>
                <Box sx={{marginLeft: 2, marginRight: "auto"}}>

                    <SuccessMessage enabled={formData != null}>Item: {itemName} created</SuccessMessage>

                    <ErrorMessage enabled={error != null}>
                        Could not create item {itemName} <br/>Reason: {error}
                    </ErrorMessage>

                </Box>
                <Button onClick={onSubmit}>Create</Button>
            </DialogActions>

        </DialogBase>)
}