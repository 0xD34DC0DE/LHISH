import {Card, CardActions, CardContent, CardMedia, IconButton, Link, Typography} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import LaunchIcon from '@mui/icons-material/Launch';
import ICategory from "../models/CategoryModel";

export interface ICategoryCardComponent {}

export const CategoryCard : ICategoryCardComponent & React.FunctionComponent<ICategory> = ({id, name}: ICategory) => {

    const SuperscriptLinkIcon = () => {
        return <LaunchIcon sx={{marginLeft: 0.5, marginBottom: 1, fontSize: 12}}/>;
    }

    return (
        <Card variant="outlined" sx={{borderRadius: 2, borderWidth: 2, borderColor: "#a1a1a1"}}>
            <CardMedia
                component="img"
                height="140"
                image={`https://picsum.photos/id/${parseInt(id) * 100}/200/140`}
            />
            <CardContent>
                <Link href="#" underline={"none"} color={"inherit"}>
                    <Typography paragraph variant="h5"
                                sx={{alignContent: "top"}}>{name}<SuperscriptLinkIcon/></Typography>
                </Link>
                <Typography paragraph sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Category
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="Localize" sx={{marginLeft: "auto" }}>
                    <ClearIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );
}