import React from "react";
import Masonry from "@mui/lab/Masonry";
import {Container} from "@mui/material";

interface CardMasonryProps {
    cards: React.ReactElement[]
}

export const CardMasonry = ({cards}: CardMasonryProps) => {
    return (
        <Container>
            <Masonry>
                {cards && React.Children.map(cards, e => e)}
            </Masonry>
        </Container>
    )
}
