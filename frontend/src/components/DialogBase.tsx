import {Dialog, DialogProps} from "@mui/material";
import React, {forwardRef, useImperativeHandle, useState} from "react";

export interface DialogBaseRef {
    openDialog: () => void;
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
        onClose
    }: DialogBaseProps, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        openDialog: () => {
            setOpen(true);
            if (onOpen) {
                onOpen();
            }
        },
    }));

    const handleClose = () => {
        setOpen(false);
        if (onClose) {
            onClose();
        }
    }

    return (
        <Dialog
            maxWidth={maxWidth} // why...
            fullWidth={fullWidth}
            open={open}
            onClose={handleClose}
        >
            {children}
        </Dialog>
    );
});

export default DialogBase;