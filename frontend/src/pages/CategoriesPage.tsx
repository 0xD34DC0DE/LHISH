import React, {useEffect, useRef, useState} from "react";
import {PageHeader} from "../components/PageHeader";
import {CardMasonry} from "../components/CardMasonry";
import {DialogBaseRef} from "../components/DialogBase";
import {CreateCategoryDialog} from "../components/CreateCategoryDialog";
import ICategory from "../views/CategoryView";
import {CategoryCard} from "../components/CategoryCard";
import {useAuthGet} from "../hooks/QueryHooks";

const CategoriesPage = () => {
    const dialogRef = useRef<DialogBaseRef>(null);
    const [get, categories, error, reset] = useAuthGet<ICategory[]>("http://localhost:8080/category/all");

    useEffect(() => {
        get();
    }, []);

    const onAddButtonClick = () => {
       dialogRef.current?.openDialog();
    }

    const mapCategories = (categories: ICategory[]) => {
        return categories.map(category => {
            return <CategoryCard {...category} key={category.id}/>
        });
    }

    const onCategoryCreated = () => {
        reset();
    }

    return (
        <>
            <PageHeader title={"Categories"} onAddButtonClick={onAddButtonClick}/>

            {/*TODO add column number change when going small (responsive)*/}
            <CardMasonry cards={mapCategories(categories ?? [])}/>
            <CreateCategoryDialog onCategoryCreated={onCategoryCreated} innerRef={dialogRef}/>
        </>
    );
};

export default CategoriesPage;