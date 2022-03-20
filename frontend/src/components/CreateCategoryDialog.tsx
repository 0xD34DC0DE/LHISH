import DialogBase, {DialogBaseRef} from "./DialogBase"
import {Box, Button, DialogContent, DialogTitle, Grid, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {FileUploadButton} from "./FileUploadButton";
import {CategoryCard} from "./CategoryCard";

export interface CreateCategoryDialogProps {
    innerRef: React.ForwardedRef<DialogBaseRef>;
}

export const CreateCategoryDialog = ({innerRef}: CreateCategoryDialogProps) => {
    const [categoryName, setCategoryName] = useState("Category namewwwwwwwww");
    const [description, setDescription] = useState("");

    return (
        <DialogBase ref={innerRef} fullWidth maxWidth={"md"}>
            <DialogTitle>Create Category</DialogTitle>
            <DialogContent>
                <Grid container direction={"row"} spacing={2}>
                    <Grid item>
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
                        />
                        <FileUploadButton/>
                    </Grid>
                    <Grid item>
                        <Typography sx={{marginTop: .5}}>Preview:</Typography>
                        <CategoryCard id={"0"} name={categoryName}/>
                    </Grid>
                </Grid>
            </DialogContent>
        </DialogBase>
    );
};