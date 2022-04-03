import React, {useEffect, useRef} from "react";
import {PageHeader} from "../components/PageHeader";
import {CardMasonry} from "../components/CardMasonry";
import {DialogBaseRef} from "../components/DialogBase";
import {useAuthGet} from "../hooks/QueryHooks";
import IItem from "../models/ItemView";
import {ItemCard} from "../components/ItemCard";
import {CreateItemDialog} from "../components/CreateItemDialog";
import {useParams} from "react-router-dom";

const ItemsPage = () => {
    const dialogRef = useRef<DialogBaseRef>(null);
    const params = useParams<{ categoryId: string }>();

    const getUrl = () => {
        if (params.categoryId)
            return `http://localhost:8080/item/category/${params.categoryId}`;
        else
            return "http://localhost:8080/item/all";
    }

    const [get, items, error, reset] = useAuthGet<IItem[]>(getUrl());

    useEffect(() => {
        get();
    }, []);

    const onAddButtonClick = () => {
        dialogRef.current?.openDialog();
    }

    const mapItems = (items: IItem[]) => {
        return items.map(item => {
            return <ItemCard {...item} key={item.id}/>
        });
    }

    const onItemCreated = () => {
        reset();
    }

    return (
        <>
            <PageHeader title={"Items"} onAddButtonClick={onAddButtonClick}/>

            {/*TODO add column number change when going small (responsive)*/}
            <CardMasonry cards={mapItems(items ?? [])}/>
            <CreateItemDialog onItemCreated={onItemCreated} innerRef={dialogRef}/>
        </>
    );
};

export default ItemsPage;