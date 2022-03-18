import DialogBase, {DialogBaseRef} from "./DialogBase"
import {Box, Button, DialogContent, DialogTitle, TextField} from "@mui/material";
import React from "react";
import {FileUploadButton} from "./FileUploadButton";

export interface CreateCategoryDialogProps {
    innerRef: React.ForwardedRef<DialogBaseRef>;
}

export const CreateCategoryDialog = ({innerRef}: CreateCategoryDialogProps) => {
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
                />

                <TextField
                    margin="dense"
                    id="name"
                    label="Description"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                />
                <FileUploadButton/>
            </DialogContent>

        </DialogBase>
    );
};