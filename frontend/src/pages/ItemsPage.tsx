import React from "react";
import {PageHeader} from "../components/PageHeader";
import {CardMasonry} from "../components/CardMasonry";
import CardFactory from "../services/CardFactory";

const ItemsPage = () => {
    return (
        <>
            <PageHeader title={"Items"}/>

            {/*TODO add column number change when going small (responsive)*/}
            <CardMasonry cards={CardFactory(10, ["item"])}/>
        </>
    );
};

export default ItemsPage;