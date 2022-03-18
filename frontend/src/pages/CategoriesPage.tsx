import React, {useRef} from "react";
import {PageHeader} from "../components/PageHeader";
import {CardMasonry} from "../components/CardMasonry";
import CardFactory from "../services/CardFactory";
import {DialogBaseRef} from "../components/DialogBase";
import {CreateCategoryDialog} from "../components/CreateCategoryDialog";

const CategoriesPage = () => {
    const dialogRef = useRef<DialogBaseRef>(null);

    const onAddButtonClick = () => {
        if (dialogRef.current) {
            dialogRef.current.openDialog()
        }
    }

    return (
        <>
            <PageHeader title={"Categories"} onAddButtonClick={onAddButtonClick}/>

            {/*TODO add column number change when going small (responsive)*/}
            <CardMasonry cards={CardFactory(10, ["category"])}/>
            <CreateCategoryDialog innerRef={dialogRef}/>
        </>
    );
};

export default CategoriesPage;