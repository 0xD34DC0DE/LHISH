import React, {useRef} from 'react';
import './App.css';
import {SessionContextProvider} from "./contexts/SessionContext";
import {AppBar, Avatar, Box, Container, IconButton, Toolbar,} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {SearchBar} from "./components/SearchBar";
import {DrawerRef, MenuDrawer} from "./components/MenuDrawer";
import {DrawerMenuItem} from "./components/DrawerMenuItem";
import {Route, Routes, useNavigate} from "react-router-dom";
import FavoritesPage from "./pages/FavoritesPage";

// const Item = styled(Paper)(({theme}) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(0.5),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));



function App() {
    const drawerRef = useRef<DrawerRef>(null);
    const navigate = useNavigate();

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
        navigate(path, {replace: true});
    }

    return (
        <SessionContextProvider>
            <AppBar position="sticky">
                <MenuDrawer ref={drawerRef}>
                    <DrawerMenuItem menuName={"Favorites"} onClick={() => navigate_to("/favorites")}/>
                    <DrawerMenuItem menuName={"Categories"} onClick={() => navigate_to("/")}/>
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

                        <IconButton>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                        </IconButton>

                    </Toolbar>
                </Box>
            </AppBar>

            <Container>
                <Routes>
                    <Route path="/favorites" element={<FavoritesPage/>}/>
                    <Route path="/" element={<FavoritesPage/>}/>
                </Routes>
            </Container>

        </SessionContextProvider>
    );
}

export default App;
