import {Avatar, Grid, Link, Typography} from "@mui/material";
import React from "react";
import { Link as RouterLink } from 'react-router-dom';

interface QuickLoginSelectPageProps {
    setUsername: (userId: string) => void
}

const QuickLoginSelectPage = ({setUsername}: QuickLoginSelectPageProps) => {

    return (
        <>
            <Grid item textAlign={"center"}>
                <Typography variant={"h4"}>Quick Login</Typography>
            </Grid>
            <Grid container
                  item
                  justifyContent={"space-around"}
                  direction={"row"}
                  spacing={2}
                  sx={{marginTop: 4}}>

                <Grid item>
                    <Link component={RouterLink} to={"/authentication"} underline="none" color="inherit" onClick={() => setUsername("test")}>
                        <Avatar sx={{width: 80, height: 80}}>A</Avatar>
                    </Link>
                </Grid>
                <Grid item>
                    <Link component={RouterLink} to={"/authentication"} underline="none" color="inherit">
                        <Avatar sx={{width: 80, height: 80}}>B</Avatar>
                    </Link>
                </Grid>
                <Grid item>
                    <Link component={RouterLink} to={"/authentication"} underline="none" color="inherit">
                        <Avatar sx={{width: 80, height: 80}}>C</Avatar>
                    </Link>
                </Grid>
            </Grid>
            <Grid item textAlign={"center"} sx={{marginTop: 6}}>
                <Link component={RouterLink} to={"/login"}>My account is no listed</Link>
            </Grid>
        </>
    );
};

export default QuickLoginSelectPage;