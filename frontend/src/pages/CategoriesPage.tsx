import React from "react";
import {PageHeader} from "../components/PageHeader";
import {CardMasonry} from "../components/CardMasonry";
import CardFactory from "../services/CardFactory";

const CategoriesPage = () => {
    return (
        <>
            <PageHeader title={"Categories"}/>

            {/*TODO add column number change when going small (responsive)*/}
            <CardMasonry cards={CardFactory(10, ["category"])}/>
        </>
    );
};

export default CategoriesPage;