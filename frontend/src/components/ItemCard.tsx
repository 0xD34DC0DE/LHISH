import {Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import UserHistory from "../icons/UserHistoryIcon";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import ClearIcon from "@mui/icons-material/Clear";
import React, {useRef} from "react";
import IItem, {Availability} from "../views/ItemView";
import {DialogBaseRef} from "./DialogBase";
import {ItemHistoryDialog} from "./ItemHistoryDialog";
import {useDeleteEntity} from "../hooks/CardDeleteHook";

interface ItemCardProps extends IItem {
    onDelete: () => void;
}

export const ItemCard = ({id, name, description, imageId, availability, historyId, onDelete}: ItemCardProps) => {
    const historyDialogRef = useRef<DialogBaseRef>(null);
    const [getDialogs, openDeleteDialog] = useDeleteEntity(
        "category",
        () => `http://localhost:8080/item/${id}`,
        onDelete
    );

    return (
        <>
            <Card variant="outlined" sx={{borderRadius: 2, borderWidth: 2, borderColor: "#a1a1a1"}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={imageId == "" ? "" : `http://localhost:8080/image/${imageId}`}
                />
                <CardContent>
                    <Typography variant="h5">{name}</Typography>
                    {/*<Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>*/}
                    {/*TODO Make availability component to render icon*/}
                    <Typography sx={{fontSize: 14}}>{Availability[availability]}</Typography>
                    <Typography sx={{fontSize: 14}} color="text.secondary"
                                gutterBottom>{description}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="View user history"
                                onClick={() => historyDialogRef.current?.openDialog()}>
                        <UserHistory/>
                    </IconButton>
                    <IconButton aria-label="Localize">
                        <NotListedLocationIcon/>
                    </IconButton>
                    <IconButton aria-label="Localize" sx={{marginLeft: "auto"}}
                                onClick={openDeleteDialog}>
                        <ClearIcon/>
                    </IconButton>
                </CardActions>
            </Card>
            <ItemHistoryDialog innerRef={historyDialogRef} itemHistoryId={historyId}/>
            {getDialogs()}
        </>
    );
}