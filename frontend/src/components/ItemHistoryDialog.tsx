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
    {field: 'accountName', headerName: 'Account name', flex: 0.2},
    {field: 'action', headerName: 'Action', flex: 0.55},
    {field: 'timestamp', headerName: 'At', flex: 0.25},
]

interface ItemAction {
    accountName: string;
    action: string;
    timestamp: Date;
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
                action: action,
                timestamp: itemHistoryAction.timestamps[index]
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
        <DialogBase ref={innerRef} onOpen={onOpen} fullWidth maxWidth={"md"}>
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