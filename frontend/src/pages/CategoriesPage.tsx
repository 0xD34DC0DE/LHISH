import React, {useEffect, useRef, useState} from "react";
import {PageHeader} from "../components/PageHeader";
import {CardMasonry} from "../components/CardMasonry";
import {DialogBaseRef} from "../components/DialogBase";
import {CreateCategoryDialog} from "../components/CreateCategoryDialog";
import ICategory from "../views/CategoryView";
import {CategoryCard} from "../components/CategoryCard";
import {useAuthGet} from "../hooks/QueryHooks";
import {PermissionNames} from "../views/PermissionNames";

const CategoriesPage = () => {
    const dialogRef = useRef<DialogBaseRef>(null);
    const [get, categories, error, reset] = useAuthGet<ICategory[]>("http://localhost:8080/category/all");

    useEffect(() => {
        get();
    }, []);

    const onAddButtonClick = () => {
        dialogRef.current?.openDialog();
    }

    const onDelete = () => {
        get()
    }

    const mapCategories = (categories: ICategory[]) => {
        return categories.map(category => {
            return <CategoryCard {...category} onDelete={onDelete} key={category.id}/>
        });
    }

    const onCategoryCreated = () => {
        reset();
        get();
    }

    return (
        <>
            <PageHeader title={"Categories"} onAddButtonClick={onAddButtonClick}
                        buttonPermission={PermissionNames.UserCreateCategory}/>

            {/*TODO add column number change when going small (responsive)*/}
            <CardMasonry cards={mapCategories(categories ?? [])}/>
            <CreateCategoryDialog onCategoryCreated={onCategoryCreated} innerRef={dialogRef}/>
        </>
    );
};

export default CategoriesPage;