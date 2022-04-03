import DialogBase, {DialogBaseRef} from "./DialogBase"
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {FileUploadButton} from "./FileUploadButton";
import {useAuthFormPost, useAuthGet} from "../hooks/QueryHooks";
import {green, red} from "@mui/material/colors";
import {CategoryIdNamePairListView} from "../models/CategoryIdNamePairListView";

export interface CreateItemDialogProps {
    innerRef: React.ForwardedRef<DialogBaseRef>;
    onItemCreated: () => void;
}

export const CreateItemDialog = ({innerRef, onItemCreated}: CreateItemDialogProps) => {
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState<File>();

    const [postForm, formData, formError, formReset] = useAuthFormPost(
        "http://localhost:8080/item/create"
    );

    useEffect(() => {
        if(!formError) {
            onItemCreated();
        }
    }, [formData]);

    const [getCategoryIdNamePairs, categoryIdNamePairs, categoryIdNamePairsError, categoryIdNamePairsReset] =
        useAuthGet<CategoryIdNamePairListView>(
            "http://localhost:8080/category/all/ids"
        );

    useEffect(() => {
        if (!categoryIdNamePairs) {
            getCategoryIdNamePairs();
        }
        if(formError || categoryIdNamePairsError) {
            formReset();
            categoryIdNamePairsReset();
        }
    }, []);

    const onSubmit = () => {
        if (!file || !itemName) return;
        postForm(
            ["name", itemName],
            ["description", description],
            ["image", file],
            ["categoryId", category]
        );
    }

    const onClose = () => {
        formReset();
        categoryIdNamePairsReset();
    }

    const buildSelect = () => {
        const categoryIds = categoryIdNamePairs?.categoryIds ?? [];
        const categoryNames = categoryIdNamePairs?.categoryNames ?? [];

        return <Select
            labelId="category-id-select-label"
            id="category-id-select"
            value={category}
            label="Category"
            onChange={(e: SelectChangeEvent) => setCategory(e.target.value)}
        >
            {categoryIds
                .map((k, i) =>
                    [k, categoryNames[i]] // zip id and category name
                )
                .map(pair => (
                    <MenuItem key={pair[0]} value={pair[0]}>{pair[1]}</MenuItem>
                ))}
        </Select>;
    }

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
                    <InputLabel id="category-id-select-label" >Category</InputLabel>
                    {buildSelect()}
                </FormControl>
                <FileUploadButton onFileChanged={setFile} accept={"image/*"} id={"image-upload"}/>
            </DialogContent>

            <DialogActions>
                <Box sx={{marginLeft: 2, marginRight: "auto"}}>
                    {formData && <Typography sx={{color: green[500]}}>Item: {itemName} created</Typography>}
                    {formError && <Typography sx={{color: red[500]}}>Could not create item
                        "{itemName}" <br/>Reason: {formError}</Typography>}
                    {categoryIdNamePairsError && <Typography sx={{color: red[500]}}>Could not create item
                        "{itemName}" <br/>Reason: {formError}</Typography>}
                </Box>
                <Button disabled={categoryIdNamePairsError != null} onClick={onSubmit}>Create</Button>
            </DialogActions>

        </DialogBase>)
}