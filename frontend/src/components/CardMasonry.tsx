import React from "react";
import Masonry from "@mui/lab/Masonry";
import {Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import UserHistory from "../icons/UserHistoryIcon";
import ClearIcon from "@mui/icons-material/Clear";
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

interface CardMasonryParams {
    numbers: number[];
}

export const CardMasonry = ({numbers}: CardMasonryParams) => {
    const makeCard = (number: number) => {
        return (
            <Card sx={{borderRadius: 2, borderWidth: 2, borderColor: "#a1a1a1"}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={`https://picsum.photos/id/${number * 100}/200/140`}
                />
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        {
                            [...Array(Math.round((Math.random() * 10) + 1.0))]
                                .map(() => {
                                    return <Typography>{number}</Typography>
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
        )
    }

    return (
        <Masonry>
            {numbers.map((e, i) => makeCard(i))}
        </Masonry>
    );
}