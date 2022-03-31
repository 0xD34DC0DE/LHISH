import DialogBase, {DialogBaseRef} from "./DialogBase"
import {Box, Button, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {FileUploadButton} from "./FileUploadButton";
import {useAuthFormPost, useAuthGet, useAuthPost} from "../hooks/QueryHooks";
import {green, red} from "@mui/material/colors";

export interface CreateCategoryDialogProps {
    innerRef: React.ForwardedRef<DialogBaseRef>;
    onCategoryCreated: () => void;
}

export const CreateCategoryDialog = ({innerRef, onCategoryCreated}: CreateCategoryDialogProps) => {
    const [categoryName, setCategoryName] = useState("Category name");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File>();

    const [postForm, data, error, reset] = useAuthFormPost(
        "http://localhost:8080/category/create"
    );

    const onSubmit = () => {
        if(!file) return;
        postForm(
            ["name", categoryName],
            ["description", description],
            ["image", file]
        );
    }

    return (
        <DialogBase ref={innerRef} fullWidth maxWidth={"sm"}>
            <DialogTitle>Create Category</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Category Name"
                    type="text"
                    fullWidth
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryName(e.target.value)}
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
                    {data && <Typography sx={{color: green[500]}}>Category: {categoryName} created</Typography>}
                    {error && <Typography sx={{color: red[500]}}>Could not create category
                        "{categoryName}" <br/>Reason: {error}</Typography>}
                </Box>
                <Button onClick={onSubmit}>Create</Button>
            </DialogActions>

        </DialogBase>
    );
};