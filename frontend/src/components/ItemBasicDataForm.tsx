import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {FormControl, Grid, InputLabel, TextField} from "@mui/material";
import {CategoryDropDown, CategoryDropDownRef} from "./CategoryDropDown";
import {FileUploadButton} from "./FileUploadButton";
import {useInput} from "../hooks/InputHook";
import {useValidation} from "../hooks/ValidationHook";
import {SelectValidationWrapper, SelectValidationWrapperRef} from "./SelectValidationWrapper";


export interface ItemBasicData {
    name: string;
    description: string;
    categoryId: string;
    image: File | null;
}

export interface ItemBasicDataFormRef {
    getData: () => ItemBasicData;
    validate: () => boolean;
}

export interface ItemBasicDataFormProps {
    setError: (error: string | null) => void;
    setItemBasicData: (itemBasicData: ItemBasicData) => void;
}

export const ItemBasicDataForm = forwardRef<ItemBasicDataFormRef, ItemBasicDataFormProps>(
    ({setError, setItemBasicData}: ItemBasicDataFormProps, ref) => {
        const [itemName, setItemName] = useInput();
        const [itemNameValidation, itemNameErrorProps] = useValidation(
            () => itemName === "" ? "Name is required" : null
        );

        const [categoryId, setCategoryId] = useState<string | null>();
        const categoryDropDownRef = useRef<CategoryDropDownRef>(null);

        const [description, setDescription] = useInput();
        const [file, setFile] = useState<File>();

        const getItemBasicData = () => ({
            name: itemName,
            description: description,
            categoryId: categoryId ?? "",
            image: file ?? null
        });

        useImperativeHandle(ref, () => ({
            getData: () => getItemBasicData(),
            validate: () => {
                if (!itemNameValidation()) {
                    setError("Item name is required");
                    return false;
                }
                if (!categoryDropDownRef.current?.validate()) {
                    return false;
                }
                if (!file) {
                    setError("Image is required");
                    return false;
                }
                return true;
            }
        }));

        useEffect(() => {
            setItemBasicData(getItemBasicData());
        }, [itemName, description, categoryId, file]);

        return (
            <Grid item xs={3}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Item Name"
                    type="text"
                    fullWidth
                    onChange={setItemName}
                    {...itemNameErrorProps}
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="Description"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    onChange={setDescription}
                />
                <CategoryDropDown
                    setCategoryId={setCategoryId}
                    setError={setError}
                    ref={categoryDropDownRef}
                />
                <FileUploadButton
                    onFileChanged={setFile}
                    accept={"image/*"}
                    id={"image-upload"}
                    label={"Upload image"}
                />
            </Grid>
        );
    }
);