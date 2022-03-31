import DialogBase, {DialogBaseRef} from "./DialogBase"
import {Box, Button, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {FileUploadButton} from "./FileUploadButton";
import {useAuthFormPost, useAuthGet, useAuthPost} from "../hooks/QueryHooks";
import {green, red} from "@mui/material/colors";

export interface CreateItemDialogProps {
    innerRef: React.ForwardedRef<DialogBaseRef>;
    onItemCreated: () => void;
}

export const CreateItemDialog = ({innerRef, onItemCreated}: CreateItemDialogProps) => {
    const [itemName, setItemName] = useState("Item name");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File>();

    const [postForm, data, error, reset] = useAuthFormPost(
        "http://localhost:8080/item/create"
    );

    const onSubmit = () => {
        if(!file) return;
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

                <FileUploadButton onFileChanged={setFile} accept={"image/*"} id={"image-upload"}/>
            </DialogContent>

            <DialogActions>
                <Box sx={{marginLeft: 2, marginRight: "auto"}}>
                    {data && <Typography sx={{color: green[500]}}>Item: {itemName} created</Typography>}
                    {error && <Typography sx={{color: red[500]}}>Could not create item
                        "{itemName}" <br/>Reason: {error}</Typography>}
                </Box>
                <Button onClick={onSubmit}>Create</Button>
            </DialogActions>

        </DialogBase>
    );
};