import React from "react";
import Masonry from "@mui/lab/Masonry";
import {Container} from "@mui/material";

interface CardMasonryParams {
    cards: React.ReactElement[]
}

export const CardMasonry = ({cards}: CardMasonryParams) => {
    return (
        <Container>
            <Masonry>
                {cards && React.Children.map(cards, e => e)}
            </Masonry>
        </Container>
    )
}
