import {Container} from "@mui/material";
import {DrawerMenuItem} from "../components/DrawerMenuItem";
import {Route, Routes, useNavigate} from "react-router-dom";
import FavoritesPage from "./FavoritesPage";
import CategoriesPage from "./CategoriesPage";
import ItemsPage from "./ItemsPage";
import React, {useRef} from "react";
import NotFoundPage from "./NotFoundPage";
import {DrawerAppBar, DrawerAppBarRef} from "../components/DrawerAppBar";

export const UserPage = () => {
    const drawerAppBarRef = useRef<DrawerAppBarRef>(null);
    const navigate = useNavigate();

    const navigate_to = (path: string) => {
        drawerAppBarRef.current?.closeDrawer();
        navigate(path);
    }

    return (
        <>
            <DrawerAppBar ref={drawerAppBarRef} enableSearchBar>
                <DrawerMenuItem menuName={"Favorites"} onClick={() => navigate_to("/favorites")}/>
                <DrawerMenuItem menuName={"Categories"} onClick={() => navigate_to("/categories")}/>
                <DrawerMenuItem menuName={"Items"} onClick={() => navigate_to("/items")}/>
            </DrawerAppBar>
            <Container>
                <Routes>
                    <Route path="/favorites" element={<FavoritesPage/>}/>
                    <Route path="/categories" element={<CategoriesPage/>}/>
                    <Route path="/items" element={<ItemsPage/>}/>
                    <Route path="/items/category/:categoryId" element={<ItemsPage/>}/>
                    <Route path="/" element={<FavoritesPage/>}/>
                    <Route path="" element={<NotFoundPage/>}/>
                </Routes>
            </Container>
        </>
    );
};