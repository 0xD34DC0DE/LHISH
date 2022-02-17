import {Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import UserHistory from "../icons/UserHistoryIcon";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";

enum Availability {
    Available,
    Taken,
    Empty,
    Unknown
}

interface ItemCardPropsType {
    id?: number,
    itemTitle: string,
    itemText: string,
    itemAvailability?: Availability
}

export const ItemCard = ({ id = 0, itemTitle, itemText="", itemAvailability=Availability.Unknown }: ItemCardPropsType) => {

    return (
        <Card variant="outlined" sx={{borderRadius: 2, borderWidth: 2, borderColor: "#a1a1a1"}}>
            <CardMedia
                component="img"
                height="140"
                image={`https://picsum.photos/id/${id * 100}/200/140`}
            />
            <CardContent>
                <Typography variant="h5">{itemTitle}</Typography>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {itemText + itemAvailability.toString()}
                    {
                        [...Array(Math.round((Math.random() * 10) + 1.0))]
                            .map(() => {
                                return <Typography>{id}</Typography>
                            })
                    }
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="View user history">
                    <UserHistory/>
                </IconButton>
                <IconButton aria-label="Localize">
                    <NotListedLocationIcon/>
                </IconButton>
                <IconButton aria-label="Localize" sx={{marginLeft: "auto"}}>
                    <ClearIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );
}