import DialogBase, {DialogBaseRef} from "./DialogBase"
import {Button, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import React, {useState} from "react";
import {FileUploadButton} from "./FileUploadButton";
import {useGet, usePost} from "../hooks/QueryHooks";

export interface CreateCategoryDialogProps {
    innerRef: React.ForwardedRef<DialogBaseRef>;
}

export const CreateCategoryDialog = ({innerRef}: CreateCategoryDialogProps) => {
    const [categoryName, setCategoryName] = useState("Category name");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File>();


    const method = () => {
        return "aaa";
    }
    const [post, data, error, reset] = usePost("http://localhost:8080/", ["1", method],["3", 4])


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
                <Button onClick={()=> post(["", 3])}>Create</Button>
            </DialogActions>
        </DialogBase>
    );
};