import {Card, CardActions, CardContent, CardMedia, IconButton, Link, Typography} from "@mui/material";
import UserHistory from "../icons/UserHistoryIcon";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import LaunchIcon from '@mui/icons-material/Launch';

interface CategoryCardPropsType {
    id?: number,
    categoryName: string
}

function SuperscriptLinkIcon() {
    return <LaunchIcon sx={{marginLeft: 0.5, marginBottom: 1, fontSize: 12}}/>;
}

export const CategoryCard = ({id = 0, categoryName}: CategoryCardPropsType) => {
    return (
        <Card sx={{borderRadius: 2, borderWidth: 2, borderColor: "#a1a1a1"}}>
            <CardMedia
                component="img"
                height="140"
                image={`https://picsum.photos/id/${id * 100}/200/140`}
            />
            <CardContent>
                <Link href="#" underline={"none"} color={"inherit"}>
                    <Typography variant="h5"
                                sx={{alignContent: "top"}}>{categoryName}<SuperscriptLinkIcon/></Typography>
                </Link>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Category
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="Localize" sx={{marginLeft: "auto"}}>
                    <ClearIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );
}