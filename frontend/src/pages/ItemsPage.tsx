import React, {useEffect, useRef} from "react";
import {PageHeader} from "../components/PageHeader";
import {CardMasonry} from "../components/CardMasonry";
import {DialogBaseRef} from "../components/DialogBase";
import {useAuthGet} from "../hooks/QueryHooks";
import IItem from "../models/ItemView";
import {ItemCard} from "../components/ItemCard";
import {CreateItemDialog} from "../components/CreateItemDialog";

const ItemsPage = () => {
    const dialogRef = useRef<DialogBaseRef>(null);
    const [get, items, error, reset] = useAuthGet<IItem[]>("http://localhost:8080/item/all");

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