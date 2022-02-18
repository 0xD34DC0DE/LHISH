import React from "react";
import Masonry from "@mui/lab/Masonry";
import {ItemCard} from "./ItemCard";
import {CategoryCard} from "./CategoryCard";

interface CardMasonryParams {
    numbers: number[];
}

export const CardMasonry = ({numbers}: CardMasonryParams) => {

    return (
        <Masonry>
            {numbers.map((e, i) => {
                if (i % 2 === 0) {
                    return <ItemCard key={i} id={i} itemText={i + "text"} itemTitle="Title"/>
                } else {
                    return <CategoryCard key={i} id={i} categoryName={"Category"}/>
                }
            })}
        </Masonry>
    )
}
