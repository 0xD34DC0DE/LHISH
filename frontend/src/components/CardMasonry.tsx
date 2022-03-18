import React from "react";
import Masonry from "@mui/lab/Masonry";
import {IItemCardComponent} from "./ItemCard";
import {ICategoryCardComponent} from "./CategoryCard";
import {Container} from "@mui/material";

interface CardMasonryParams {
    cards: (IItemCardComponent | ICategoryCardComponent)[]
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
