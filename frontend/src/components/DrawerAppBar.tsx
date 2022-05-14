import React, {forwardRef, useContext, useImperativeHandle, useRef} from "react";
import {DrawerRef, MenuDrawer} from "./MenuDrawer";
import {useNavigate} from "react-router-dom";
import SessionContext from "../contexts/SessionContext";
import {AppBar, Avatar, Box, IconButton, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {SearchBar} from "./SearchBar";

export interface DrawerAppBarRef {
    openDrawer: () => void;
    closeDrawer: () => void;
}

export interface DrawerAppBarProps {
    enableSearchBar?: boolean;
    children?: React.ReactNode;
}

export const DrawerAppBar = forwardRef<DrawerAppBarRef, DrawerAppBarProps>(
    ({children, enableSearchBar}: DrawerAppBarProps, ref) => {
        const drawerRef = useRef<DrawerRef>(null);
        const navigate = useNavigate();
        const {session, dispatch} = useContext(SessionContext);

        useImperativeHandle(ref, () => ({
            openDrawer: () => {
                drawerRef.current?.openDrawer();
            },
            closeDrawer: () => {
                drawerRef.current?.closeDrawer();
            }
        }));

        const openDrawer = () => {
            drawerRef.current?.openDrawer();
        }

        const closeDrawer = () => {
            drawerRef.current?.closeDrawer();
        }

        const logout = () => {
            dispatch({type: "logout"});
            navigate("/");
        }

        return (
            <AppBar position="sticky">
                {children && <MenuDrawer ref={drawerRef}>
                    {children}
                </MenuDrawer>}

                <Box>
                    <Toolbar variant="dense" sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <IconButton onClick={openDrawer} edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>

                        {enableSearchBar && <Box sx={{flexGrow: 0.6}}>
                            <SearchBar label={"Quick Search..."} onSubmit={() => {
                            }}/>
                        </Box>}

                        <IconButton onClick={logout}>
                            <Avatar alt={session.username} src="/static/images/avatar/2.jpg"/>
                        </IconButton>
                    </Toolbar>
                </Box>
            </AppBar>
        );
    }
);