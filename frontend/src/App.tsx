import React from 'react';
import './App.css';
import {SessionContextProvider} from "./contexts/SessionContext";
import {AppBar, Avatar, Box, Container, Divider, IconButton, Toolbar, Typography,} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import MenuIcon from '@mui/icons-material/Menu';
import {SearchBar} from "./components/SearchBar";
import {yellow} from "@mui/material/colors";

function App() {
    return (
        <SessionContextProvider>
            <AppBar position="static">
                <Box>
                    <Toolbar variant="dense" sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>

                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
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
                <Typography sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    my:2
                }} variant={"h2"}>Favorites<StarIcon fontSize="inherit" sx={{color: yellow[600], ml: 3}}/></Typography>
                <Divider/>
            </Container>

        </SessionContextProvider>
    );
}

export default App;
