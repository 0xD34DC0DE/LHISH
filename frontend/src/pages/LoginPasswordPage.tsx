import {Avatar, Button, Grid, Link, TextField, Typography} from "@mui/material";
import React, {useContext, useState} from "react";
import SessionContext from "../contexts/SessionContext";

interface LoginPasswordPageProps {
    userId: string
}

const LoginPasswordPage = ({userId}: LoginPasswordPageProps) => {
    const [password, setPassword] = useState("");
    const {dispatch} = useContext(SessionContext);

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const login = (password: string) => {
        dispatch({type: "login", userId: userId, password: password});
    }

    return (
        <>
            <Grid item textAlign={"center"}>
                <Typography variant={"h4"}>Quick Login</Typography>
            </Grid>

            <Grid item container direction={"row"} justifyContent={"center"} sx={{marginTop: 4}}>
                <Avatar sx={{width: 80, height: 80}}>B</Avatar>
            </Grid>
            <Grid item textAlign={"center"} sx={{marginTop: 2}}>
                <Typography variant={"h6"}>{userId}</Typography>
            </Grid>

            <Grid item container direction={"row"} justifyContent={"center"} sx={{marginTop: 2}}>
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={onPasswordChange}
                />
            </Grid>

            <Grid item container direction={"row"} justifyContent={"center"} sx={{marginTop: 3}}>
                <Button variant={"contained"} onClick={() => login(password)}>Login</Button>
            </Grid>
            <Grid item textAlign={"center"} sx={{marginTop: 3}}>
                <Link href={"/"}>This is not my account</Link>
            </Grid>
        </>
    );
};

export default LoginPasswordPage;