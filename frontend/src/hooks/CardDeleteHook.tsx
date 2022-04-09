import React, {useEffect, useRef, useState} from "react";
import {ConfirmationDialog, ConfirmationDialogRef} from "../components/ConfirmationDialog";
import {ErrorDialog, ErrorDialogRef} from "../components/ErrorDialog";
import {useAuthDelete} from "./QueryHooks";


export const useDeleteEntity = (entityName: string, url: (() => string), onSuccess: (() => void)) => {
    const confirmationDialogRef = useRef<ConfirmationDialogRef>(null);
    const errorDialogRef = useRef<ErrorDialogRef>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [deleteEntity, message, error, reset] = useAuthDelete(url);

    const onConfirmation = () => {
        deleteEntity();
    }

    useEffect(() => {
        setErrorMessage(error);
    }, [error]);

    useEffect(() => {
        if (message === null && error === null) {
            return;
        }
        if (error) {
            setErrorMessage(error);
            confirmationDialogRef.current?.closeDialog();
            errorDialogRef.current?.openDialog();
        }
        if (message) {
            onSuccess();
        }
    }, [error, message]);

    const getDialogs = () => {
        return (<>
            <ConfirmationDialog ref={confirmationDialogRef}
                                onConfirmation={onConfirmation}
                                title={`Delete ${entityName}`}
                                message={`Are you sure you want to delete this ${entityName} ?`}/>
            <ErrorDialog ref={errorDialogRef} onClose={reset} message={errorMessage}/>
        </>)
    }

    const openDeleteDialog = () => {
        confirmationDialogRef.current?.openDialog();
    }

    return [getDialogs, openDeleteDialog];
}