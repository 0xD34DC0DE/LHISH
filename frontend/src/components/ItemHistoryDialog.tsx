import React, {useEffect, useState} from "react";
import DialogBase, {DialogBaseRef} from "./DialogBase";
import {DialogContent, DialogTitle, Typography} from "@mui/material";
import {useAuthGet} from "../hooks/QueryHooks";
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {IItemHistoryView} from "../views/ItemHistoryView";
import {ErrorMessage} from "./ErrorMessage";

export interface ItemHistoryDialogProps {
    itemHistoryId: string;
    innerRef: React.ForwardedRef<DialogBaseRef>;
}

const columns: GridColDef[] = [
    {field: 'accountName', headerName: 'Account name', width: 150},
    {field: 'action', headerName: 'Action', width: 400},
]

interface ItemAction {
    accountName: string;
    action: string;
}

export const ItemHistoryDialog = ({innerRef, itemHistoryId}: ItemHistoryDialogProps) => {
    const [rows, setRows] = useState<ItemAction[]>([]);
    const [get, itemHistoryAction, error, reset] = useAuthGet<IItemHistoryView>(() => `http://localhost:8080/itemhistory/${itemHistoryId}`);
    const [hasRows, setHasRows] = useState(false);

    const getActions = () => {
        if (!itemHistoryAction) return [];
        return itemHistoryAction.actions.map((action, index) => {
            return {
                id: index,
                accountName: itemHistoryAction.accountNames[index],
                action: action
            }
        })
    }

    useEffect(() => {
        if (itemHistoryAction) {
            setRows(getActions());
            setHasRows(itemHistoryAction.actions.length > 0);
        }
    }, [itemHistoryAction]);


    const onOpen = () => {
        get();
    }

    return (
        <DialogBase ref={innerRef} onOpen={onOpen} fullWidth maxWidth={"sm"}>
            <DialogTitle>Item History</DialogTitle>
            <DialogContent>
                {!hasRows && <Typography>No history available</Typography>}
                {hasRows && <DataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    rowSpacingType={"border"}
                />}
                <ErrorMessage enabled={error !== null}>{error}</ErrorMessage>
            </DialogContent>
        </DialogBase>
    );
};