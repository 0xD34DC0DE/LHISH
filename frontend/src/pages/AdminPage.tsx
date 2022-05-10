import React, {useRef} from "react";
import {DrawerAppBar, DrawerAppBarRef} from "../components/DrawerAppBar";
import {Route, Routes, useNavigate} from "react-router-dom";
import {DrawerMenuItem} from "../components/DrawerMenuItem";
import {Container} from "@mui/material";
import FavoritesPage from "./FavoritesPage";
import CategoriesPage from "./CategoriesPage";
import ItemsPage from "./ItemsPage";
import NotFoundPage from "./NotFoundPage";
import {AdminUsersPage} from "./AdminUsersPage";
import {AdminPermissionPage} from "./AdminPermissionPage";
import {AdminDashboard} from "./AdminDashboard";

export interface AdminPageProps {

}

export const AdminPage = ({}: AdminPageProps) => {
    const drawerAppBarRef = useRef<DrawerAppBarRef>(null);
    const navigate = useNavigate();

    const navigate_to = (path: string) => {
        drawerAppBarRef.current?.closeDrawer();
        navigate(path);
    }

    return (
        <>
            <DrawerAppBar ref={drawerAppBarRef}>
                <DrawerMenuItem menuName={"Dashboard"} onClick={() => navigate_to("/")}/>
                <DrawerMenuItem menuName={"Users"} onClick={() => navigate_to("/users")}/>
                <DrawerMenuItem menuName={"Permissions"} onClick={() => navigate_to("/permissions")}/>
            </DrawerAppBar>
            <Container>
                <Routes>
                    <Route path="/users" element={<AdminUsersPage/>}/>
                    <Route path="/permissions" element={<AdminPermissionPage/>}/>
                    <Route path="/" element={<AdminDashboard/>}/>
                    <Route path="" element={<NotFoundPage/>}/>
                </Routes>
            </Container>
        </>
    );
};