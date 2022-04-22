import {Avatar, Grid, Link, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import { Link as RouterLink } from 'react-router-dom';
import {useAuthGet, useGet} from "../hooks/QueryHooks";
import {ErrorMessage} from "../components/ErrorMessage";

interface QuickLoginSelectPageProps {
    setUsername: (userId: string) => void
}

const QuickLoginSelectPage = ({setUsername}: QuickLoginSelectPageProps) => {
    const [error, setError] = useState<string | null>(null);
    const [getUsernames, usernames, usernamesError, usernamesReset] = useGet<string[]>("http://localhost:8080/user/usernames");

    useEffect(() => {
        getUsernames()
    }, []);

    useEffect(() => {
        setError(usernamesError);
    }, [usernamesError]);

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

                {(usernames ?? []).map((username: string, i: number) => (
                    <Grid item key={i}>
                        <Link component={RouterLink} to={"/authentication"} underline="none" color="inherit" onClick={() => setUsername(username)}>
                            <Avatar sx={{width: 80, height: 80}}>{username}</Avatar>
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <Grid item textAlign={"center"} sx={{marginTop: 6}}>
                <Link component={RouterLink} to={"/login"}>My account is no listed</Link>
            </Grid>
        </>
    );
};

export default QuickLoginSelectPage;