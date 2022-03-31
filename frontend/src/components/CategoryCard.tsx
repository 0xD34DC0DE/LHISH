import {Card, CardActions, CardContent, CardMedia, IconButton, Link, Typography} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import LaunchIcon from '@mui/icons-material/Launch';
import ICategory from "../models/CategoryModel";

export interface ICategoryCardComponent {}

export const CategoryCard : ICategoryCardComponent & React.FunctionComponent<ICategory> = ({id, name, description, image}: ICategory) => {

    const SuperscriptLinkIcon = () => {
        return <LaunchIcon sx={{marginLeft: 0.5, marginBottom: 1, fontSize: 12}}/>;
    }

    const base64StringToBlob = (base64String: string) => {
        const byteCharacters = window.atob(base64String);
        const byteCount = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteCount[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteCount);
        return new Blob([byteArray], {type: 'image/jpeg'});
    }

    return (
        <Card variant="outlined" sx={{borderRadius: 2, borderWidth: 2, borderColor: "#a1a1a1"}}>
            <CardMedia
                component="img"
                height="140"
                image={URL.createObjectURL(base64StringToBlob(image))}
            />
            <CardContent>
                <Link href="#" underline={"none"} color={"inherit"}>
                    <Typography paragraph variant="h5"
                                sx={{alignContent: "top"}}>{name}<SuperscriptLinkIcon/></Typography>
                </Link>
                <Typography paragraph sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Category: {description}
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