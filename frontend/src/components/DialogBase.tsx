import {Dialog, DialogProps} from "@mui/material";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";

export interface DialogBaseRef {
    openDialog: () => void;
    closeDialog: () => void;
}

export interface DialogBaseProps {
    children: React.ReactNode;
    fullWidth?: boolean;
    maxWidth?: DialogProps['maxWidth'];
    onOpen?: () => void;
    onClose?: () => void;
}

const DialogBase = forwardRef<DialogBaseRef, DialogBaseProps>((
    {
        children,
        fullWidth = false,
        maxWidth = "md",
        onOpen,
        onClose,
    }: DialogBaseProps, ref) => {
    const [open, setOpen] = useState(false);

    const openDialog = () => {
        setOpen(true);
        if (onOpen) {
            onOpen();
        }
    }

    const closeDialog = () => {
        setOpen(false);
        if (onClose) {
            onClose();
        }
    }

    useImperativeHandle(ref, () => ({
        openDialog: () => {
            openDialog();
        },
        closeDialog: () => {
            closeDialog();
        }
    }));

    return (
        <Dialog
            maxWidth={maxWidth} // why...
            fullWidth={fullWidth}
            open={open}
            onClose={closeDialog}
        >
            {children}
        </Dialog>
    );
});

export default DialogBase;