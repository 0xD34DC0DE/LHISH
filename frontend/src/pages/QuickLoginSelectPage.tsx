import {Avatar, Grid, Link, Typography} from "@mui/material";
import React from "react";

interface QuickLoginSelectPageProps {
    setUserId: (userId: string) => void
}

const QuickLoginSelectPage = ({setUserId}: QuickLoginSelectPageProps) => {

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
                    <Link href={"/authentication"} underline="none" color="inherit" onClick={() => setUserId("abc")}>
                        <Avatar sx={{width: 80, height: 80}}>A</Avatar>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href={"/authentication"} underline="none" color="inherit">
                        <Avatar sx={{width: 80, height: 80}}>B</Avatar>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href={"/authentication"} underline="none" color="inherit">
                        <Avatar sx={{width: 80, height: 80}}>C</Avatar>
                    </Link>
                </Grid>
            </Grid>
            <Grid item textAlign={"center"} sx={{marginTop: 6}}>
                <Link href={"/login"}>My account is no listed</Link>
            </Grid>
        </>
    );
};

export default QuickLoginSelectPage;