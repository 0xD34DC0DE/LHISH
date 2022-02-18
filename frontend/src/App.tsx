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
    return (
        <SessionContextProvider>
            <ProtectedRoutes>

            </ProtectedRoutes>
        </SessionContextProvider>
    );
}

export default App;
