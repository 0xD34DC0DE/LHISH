import React, {useState} from 'react';
import './App.css';
import {SessionContextProvider} from "./contexts/SessionContext";
import {
    AppBar,
    Avatar,
    Box,
    Card,
    CardContent,
    Container,
    Divider,
    IconButton,
    TablePagination,
    Toolbar,
    Typography,
} from "@mui/material";
import Masonry from '@mui/lab/Masonry';
import StarIcon from '@mui/icons-material/Star';
import MenuIcon from '@mui/icons-material/Menu';
import {SearchBar} from "./components/SearchBar";
import {yellow} from "@mui/material/colors";

// const Item = styled(Paper)(({theme}) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(0.5),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

function App() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    function handleChangePage() {

    }

    function handleChangeRowsPerPage() {

    }

    const makeCard = (number: number) => {
        return (
            <React.Fragment>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        {
                            [...Array(Math.round((Math.random() * 10) + 1.0))]
                                .map(() =>{ return <Typography>{number}</Typography>})}
                    </Typography>
                </CardContent>
            </React.Fragment>)
    }

    const numbers = [150, 30, 90, 70, 90, 100, 150, 30, 50, 80];
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
                    my: 2
                }} variant={"h2"}>Favorites<StarIcon fontSize="inherit" sx={{color: yellow[600], ml: 3}}/></Typography>

                <TablePagination
                    component="div"
                    count={100}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        ml: 0,
                        display: "flex",
                        '& .MuiToolbar-root': {
                            paddingLeft: 0.5,
                        }
                    }}
                />
                <Divider/>

                <Masonry>
                    {numbers.map((height, index) => (
                        <Card key={index}>
                            {makeCard(index + 1)}
                        </Card>
                    ))}
                </Masonry>
            </Container>

        </SessionContextProvider>
    );
}

export default App;
