import {Avatar, Button, Grid, Link, TextField, Typography} from "@mui/material";
import React from "react";

export const ManualLoginPage = () => {
    return (
        <>
            <Grid item textAlign={"center"}>
                <Typography variant={"h4"}>Login</Typography>
            </Grid>
            <Grid container
                  item
                  justifyContent={"space-around"}
                  direction={"row"}
                  spacing={2}
                  sx={{marginTop: 4}}>
            </Grid>
            <Grid item container direction={"row"} justifyContent={"center"} sx={{marginTop: 1}}>
                <TextField
                    id="outlined-password-input"
                    label="Username"
                    type="text"
                    autoComplete="current-password"
                />
            </Grid>
            <Grid item container direction={"row"} justifyContent={"center"} sx={{marginTop: 4}}>
                <Link href={"/register"}>
                    <Button variant={"contained"}>Continue</Button>
                </Link>
            </Grid>

            <Grid item textAlign={"center"} sx={{marginTop: 5}}>
                <Link href={"/register"}>I don't have an account</Link>
            </Grid>
        </>
    );
};

export default ManualLoginPage;