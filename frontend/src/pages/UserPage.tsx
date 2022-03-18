import {AppBar, Avatar, Box, Container, IconButton, Toolbar} from "@mui/material";
import {DrawerRef, MenuDrawer} from "../components/MenuDrawer";
import {DrawerMenuItem} from "../components/DrawerMenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import {SearchBar} from "../components/SearchBar";
import {useNavigate} from "react-router-dom";
import FavoritesPage from "./FavoritesPage";
import CategoriesPage from "./CategoriesPage";
import ItemsPage from "./ItemsPage";
import React, {useContext, useRef} from "react";
import {Route, Routes} from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import SessionContext from "../contexts/SessionContext";

export const UserPage = () => {
    const drawerRef = useRef<DrawerRef>(null);
    const navigate = useNavigate();
    const {session, dispatch} = useContext(SessionContext);

    const openDrawer = () => {
        if (drawerRef.current) {
            drawerRef.current.openDrawer()
        }
    }

    const closeDrawer = () => {
        if (drawerRef.current) {
            drawerRef.current.closeDrawer()
        }
    }

    const navigate_to = (path: string) => {
        closeDrawer();
        navigate(path);
    }

    const logout = () => {
        dispatch({type: "logout"});
        navigate("/");
    }

    return (
        <>
            <AppBar position="sticky">
                <MenuDrawer ref={drawerRef}>
                    <DrawerMenuItem menuName={"Favorites"} onClick={() => navigate_to("/favorites")}/>
                    <DrawerMenuItem menuName={"Categories"} onClick={() => navigate_to("/categories")}/>
                    <DrawerMenuItem menuName={"Items"} onClick={() => navigate_to("/items")}/>
                </MenuDrawer>
                <Box>
                    <Toolbar variant="dense" sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>

                        <IconButton onClick={openDrawer} edge="start" color="inherit" aria-label="menu"
                                    sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>

                        <Box sx={{flexGrow: 0.6}}>
                            <SearchBar label={"Quick Search..."} onSubmit={() => {
                            }}/>
                        </Box>

                        <IconButton onClick={logout}>
                            <Avatar alt={session.username} src="/static/images/avatar/2.jpg"/>
                        </IconButton>

                    </Toolbar>
                </Box>
            </AppBar>
            <Container>

                <Routes>
                    <Route path="/favorites" element={<FavoritesPage/>}/>
                    <Route path="/categories" element={<CategoriesPage/>}/>
                    <Route path="/items" element={<ItemsPage/>}/>
                    <Route path="/" element={<FavoritesPage/>}/>
                    <Route path="" element={<NotFoundPage/>}/>
                </Routes>

            </Container>
        </>
    );
};