import {Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import UserHistory from "../icons/UserHistoryIcon";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import ClearIcon from "@mui/icons-material/Clear";
import React, {useRef} from "react";
import IItem, {Availability} from "../views/ItemView";
import {DialogBaseRef} from "./DialogBase";
import {ItemHistoryDialog} from "./ItemHistoryDialog";
import {useDeleteEntity} from "../hooks/CardDeleteHook";
import {Field} from "../card_field_components/Fields";
import {ValueFieldFactory} from "../card_field_components/card_field/base/ValueFieldFactory";
import {PermissionGuard} from "./PermissionGuard";
import {PermissionNames} from "../views/PermissionNames";

interface ItemCardProps extends IItem {
    onDelete: () => void;
    fields?: (Field | null)[];
}

export const ItemCard = ({
                             id = null,
                             name,
                             description,
                             imageId = null,
                             availability = null,
                             historyId = null,
                             onDelete,
                             fields = [],
                         }: ItemCardProps) => {
    const historyDialogRef = useRef<DialogBaseRef>(null);
    const [getDialogs, openDeleteDialog] = useDeleteEntity(
        "item",
        () => `http://localhost:8080/item/${id}`,
        onDelete
    );

    const deleteButtonClicked = () => {
        if (id) {
            openDeleteDialog();
        }
    };

    const onHistoryButtonClicked = () => {
        if (historyId) {
            historyDialogRef.current?.openDialog();
        }
    };

    return (
        <>
            <Card variant="outlined" sx={{borderRadius: 2, borderWidth: 2, borderColor: "#a1a1a1"}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={imageId ? `http://localhost:8080/image/${imageId}` : ""}
                />
                <CardContent>
                    <Typography variant="h5">{name}</Typography>
                    {/*TODO Make availability component to render icon*/}
                    {availability && <Typography sx={{fontSize: 14}}>{Availability[availability]}</Typography>}
                    <Typography sx={{fontSize: 14}} color="text.secondary"
                                gutterBottom>{description}</Typography>
                    <ValueFieldFactory fields={fields}/>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="View user history"
                                onClick={onHistoryButtonClicked}>
                        <UserHistory/>
                    </IconButton>
                    <PermissionGuard permissionName={PermissionNames.UserDeleteItem}>
                        <IconButton aria-label="Localize" sx={{marginLeft: "auto"}}
                                    onClick={deleteButtonClicked}>
                            <ClearIcon/>
                        </IconButton>
                    </PermissionGuard>
                </CardActions>
            </Card>
            <ItemHistoryDialog innerRef={historyDialogRef} itemHistoryId={historyId ?? ""}/>
            {getDialogs()}
        </>
    );
}