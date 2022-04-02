import {Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import UserHistory from "../icons/UserHistoryIcon";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import IItem, { Availability } from "../models/ItemModel";

export interface IItemCardComponent {
}

export const ItemCard: IItemCardComponent & React.FunctionComponent<IItem> =
    ({id, name, description, imageId, availability}:IItem) => {

        return (
            <Card variant="outlined" sx={{borderRadius: 2, borderWidth: 2, borderColor: "#a1a1a1"}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:8080/image/${imageId}`} // TODO replace with getImageUrl for authentication
                />
                <CardContent>
                    <Typography variant="h5">{name}</Typography>
                    {/*<Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>*/}
                    {description} {/*TODO Make availability component to render icon*/}
                    <Typography sx={{fontSize: 14}}>{Availability[availability]}</Typography>
                    {
                        [...Array(Math.round((Math.random() * 10) + 1.0))]
                            .map((e, i) => {
                                return <Typography key={i} sx={{fontSize: 14}} color="text.secondary"
                                                   gutterBottom>{id}</Typography>
                            })
                    }
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