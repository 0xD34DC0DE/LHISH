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

export interface CreateItemDialogProps {
    innerRef: React.ForwardedRef<DialogBaseRef>;
    onItemCreated: () => void;
}

export const CreateItemDialog = ({innerRef, onItemCreated}: CreateItemDialogProps) => {
    const [itemName, setItemName] = useState("Item name");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState<File>();

    const [postForm, formData, formError] = useAuthFormPost(
        "http://localhost:8080/item/create"
    );

    const [getCategoryIds, categoryIds, categoryIdsError] = useAuthGet<string[]>(
        "http://localhost:8080/category/all/ids"
    );

    useEffect(() => {
        if (!categoryIds) {
            getCategoryIds();
        }
    }, []);

    const onSubmit = () => {
        if (!file) return;
        postForm(
            ["name", itemName],
            ["description", description],
            ["image", file]
        );
    }

    return (
        <DialogBase ref={innerRef} fullWidth maxWidth={"sm"}>
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
                <FormControl fullWidth>
                    <InputLabel id="category-id-select-label">Category</InputLabel>
                    <Select
                        labelId="category-id-select-label"
                        id="category-id-select"
                        value={category}
                        label="Category"
                        onChange={(e: SelectChangeEvent) => setCategory(e.target.value)}
                    >
                        {categoryIds && categoryIds.map(id => (
                            <MenuItem key={id} value={id}>{id}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FileUploadButton onFileChanged={setFile} accept={"image/*"} id={"image-upload"}/>
            </DialogContent>

            <DialogActions>
                <Box sx={{marginLeft: 2, marginRight: "auto"}}>
                    {formData && <Typography sx={{color: green[500]}}>Item: {itemName} created</Typography>}
                    {formError && <Typography sx={{color: red[500]}}>Could not create item
                        "{itemName}" <br/>Reason: {formError}</Typography>}
                    {categoryIdsError && <Typography sx={{color: red[500]}}>Could not create item
                        "{itemName}" <br/>Reason: {formError}</Typography>}
                </Box>
                <Button disabled={categoryIdsError != null} onClick={onSubmit}>Create</Button>
            </DialogActions>

        </DialogBase>
    );
};