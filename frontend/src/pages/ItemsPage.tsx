import React, {useEffect, useRef} from "react";
import {PageHeader} from "../components/PageHeader";
import {CardMasonry} from "../components/CardMasonry";
import {DialogBaseRef} from "../components/DialogBase";
import {useAuthGet} from "../hooks/QueryHooks";
import IItem from "../views/ItemView";
import {ItemCard} from "../components/ItemCard";
import {CreateItemDialog} from "../components/CreateItemDialog";
import {useLocation, useParams} from "react-router-dom";
import {Typography} from "@mui/material";
import {red} from "@mui/material/colors";
import ICategory from "../views/CategoryView";

const ItemsPage = () => {
    const dialogRef = useRef<DialogBaseRef>(null);
    const params = useParams<{ categoryId: string }>();
    const isInCategory = params.categoryId !== undefined;
    const location = useLocation();

    const getItemsUrl = () => {
        if (isInCategory)
            return `http://localhost:8080/item/category/${params.categoryId}`;
        else
            return "http://localhost:8080/item/all";
    }

    const [getItems, items, itemsError, itemsReset] = useAuthGet<IItem[]>(getItemsUrl());
    const [getCategory, category, categoryError, categoryReset] =
        useAuthGet<ICategory>(`http://localhost:8080/category/${params.categoryId}`);

    useEffect(() => {
        getItems();
        categoryReset();
        if (isInCategory)
            getCategory();
    }, [location]);

    const onAddButtonClick = () => {
        dialogRef.current?.openDialog();
    }

    const mapItems = (items: IItem[]) => {
        return items.map(item => {
            return <ItemCard {...item} key={item.id}/>
        });
    }

    const onItemCreated = () => {
        getItems();
    }

    function getTitle() {
        if (isInCategory)
            return `Items of category: ${category?.name ?? ""}`;
        else
            return "All Items";
    }

    return (
        <>
            <PageHeader title={getTitle()} onAddButtonClick={onAddButtonClick}/>
            {itemsError && <Typography color={red[500]}>{itemsError}</Typography>}
            {category && !items?.length && <Typography>No items in category: {category.name}</Typography>}
            {/*TODO add column number change when going small (responsive)*/}
            <CardMasonry cards={mapItems(items ?? [])}/>
            <CreateItemDialog onItemCreated={onItemCreated} innerRef={dialogRef}/>
        </>
    );
};

export default ItemsPage;