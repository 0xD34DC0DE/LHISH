import DialogBase, {DialogBaseRef} from "./DialogBase"
import {Box, Button, DialogContent, DialogTitle, Grid, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {FileUploadButton} from "./FileUploadButton";
import {CategoryCard} from "./CategoryCard";

export interface CreateCategoryDialogProps {
    innerRef: React.ForwardedRef<DialogBaseRef>;
}

export const CreateCategoryDialog = ({innerRef}: CreateCategoryDialogProps) => {
    const [categoryName, setCategoryName] = useState("Category name");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File>();

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
        </DialogBase>
    );
};