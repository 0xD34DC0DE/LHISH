import React, {forwardRef, useImperativeHandle, useRef} from "react";
import DialogBase, {DialogBaseRef} from "./DialogBase";
import {Button, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

export interface ErrorDialogRef {
    openDialog: () => void;
}

export interface ErrorDialogProps {
    message: string | null;
    onClose: () => void;
}

export const ErrorDialog = forwardRef<ErrorDialogRef, ErrorDialogProps>(({message, onClose}: ErrorDialogProps, ref) => {
    const baseDialogRef = useRef<DialogBaseRef>(null);

    useImperativeHandle(ref, () => ({
        openDialog: () => {
            baseDialogRef.current?.openDialog();
        },
    }));

    const closeDialog = () => {
        baseDialogRef.current?.closeDialog();
    }

    return (
        <DialogBase ref={baseDialogRef} onClose={onClose} fullWidth maxWidth={"sm"}>
            <DialogTitle>Error</DialogTitle>

            <DialogContent>
                <Typography>{message ?? "An error occurred"}</Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={closeDialog}>
                    Ok
                </Button>
            </DialogActions>

        </DialogBase>
    );
});