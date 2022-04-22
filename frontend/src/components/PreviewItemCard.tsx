import {Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import {Field} from "../card_field_components/Fields";
import {ValueFieldFactory} from "../card_field_components/card_field/base/ValueFieldFactory";

interface PreviewItemCardProps {
    imageUrl?: string | null;
    fields?: (Field | null)[];
    name: string | null;
    description: string | null;
}

export const PreviewItemCard = ({
                                    name = null,
                                    description = null,
                                    imageUrl = null,
                                    fields = []
                                }: PreviewItemCardProps) => {
    return (
        <>
            <Card variant="outlined" sx={{borderRadius: 2, borderWidth: 2, borderColor: "#a1a1a1"}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={imageUrl ?? ""}
                />
                <CardContent>
                    <Typography variant="h5">{name}</Typography>
                    <Typography sx={{fontSize: 14}} color="text.secondary"
                                gutterBottom>{description}</Typography>
                    <ValueFieldFactory fields={fields}/>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="View user history"/>
                    <IconButton aria-label="Localize">
                        <NotListedLocationIcon/>
                    </IconButton>
                    <IconButton aria-label="Localize" sx={{marginLeft: "auto"}}>
                        <ClearIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </>
    );
}