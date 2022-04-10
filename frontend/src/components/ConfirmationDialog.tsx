import React, {forwardRef, useImperativeHandle, useRef} from "react";
import DialogBase, {DialogBaseRef} from "./DialogBase";
import {Button, DialogActions, DialogContent, DialogTitle} from "@mui/material";


export interface ConfirmationDialogRef {
    openDialog: () => void;
    closeDialog: () => void;
}

export interface ConfirmationDialogProps {
    onConfirmation: () => void;
    onCancel?: (() => void);
    title: string;
    message: string;
    type?: "yes/no" | "ok/cancel";
}

const noop = () => {
};

export const ConfirmationDialog = forwardRef<ConfirmationDialogRef, ConfirmationDialogProps>(
    ({onConfirmation, onCancel = noop, title, message, type = "yes/no"}: ConfirmationDialogProps, ref) => {
        const baseDialogRef = useRef<DialogBaseRef>(null);

        const onClose = () => {
            baseDialogRef.current?.closeDialog();
            onCancel();
        };

        const onConfirm = () => {
            baseDialogRef.current?.closeDialog();
            onConfirmation();
        };

        useImperativeHandle(ref, () => ({
            openDialog: () => {
                baseDialogRef.current?.openDialog();
            },
            closeDialog: () => {
                onClose();
            }
        }));

        return (
            <DialogBase ref={baseDialogRef} fullWidth maxWidth={"sm"}>
                <DialogTitle>{title}</DialogTitle>

                <DialogContent>
                    {message}
                </DialogContent>

                <DialogActions>
                    <Button onClick={onConfirm}>
                        {type === "yes/no" ? "Yes" : "Ok"}
                    </Button>
                    <Button onClick={onClose}>
                        {type === "yes/no" ? "No" : "Cancel"}
                    </Button>
                </DialogActions>

            </DialogBase>
        );
    }
);