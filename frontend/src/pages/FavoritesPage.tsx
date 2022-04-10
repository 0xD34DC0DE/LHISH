import React from "react";
import StarIcon from "@mui/icons-material/Star";
import {yellow} from "@mui/material/colors";
import {CardMasonry} from "../components/CardMasonry";
import {PageHeader} from "../components/PageHeader";


const FavoritesPage = () => {
    return <>
        <PageHeader title={
            <>Favorites<StarIcon fontSize="inherit" sx={{color: yellow[600], ml: 3}}/></>
        }/>

        {/*TODO add column number change when going small (responsive)*/}
        <CardMasonry cards={[]}/>
    </>;
}

export default FavoritesPage