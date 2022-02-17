import React from "react";
import Masonry from "@mui/lab/Masonry";
import {Card, CardContent, Typography} from "@mui/material";


interface CardMasonryParams {
    numbers: number[];
}

export const CardMasonry = ({numbers}: CardMasonryParams) => {
    const makeCard = (number: number) => {
        return (
            <Card variant="outlined">
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
            </Card>
        )
    }

    return (
        <Masonry>
            {numbers.map((e, i) => makeCard(i))}
        </Masonry>
    );
}