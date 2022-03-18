import {Dialog, DialogProps} from "@mui/material";
import React, {forwardRef, useImperativeHandle, useState} from "react";

export interface DialogBaseRef {
    openDialog: () => void;
}

export interface DialogBaseProps {
    children: React.ReactNode;
    fullWidth?: boolean;
    maxWidth?: DialogProps['maxWidth'];
}

const DialogBase = forwardRef<DialogBaseRef, DialogBaseProps>(({children, fullWidth = false, maxWidth = "md" }: DialogBaseProps, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        openDialog: () => {
            setOpen(true);
        },
    }));

    const handleClose = () => {
        setOpen(false);
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