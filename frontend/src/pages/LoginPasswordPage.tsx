import {Avatar, Button, Grid, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from 'react-router-dom';
import React, {useContext, useEffect, useState} from "react";
import SessionContext from "../contexts/SessionContext";
import {authenticate} from "../services/SessionService";

interface LoginPasswordPageProps {
    username: string
}

const LoginPasswordPage = ({username}: LoginPasswordPageProps) => {
        const [password, setPassword] = useState("");
        const {dispatch} = useContext(SessionContext);
        const [error, setError] = useState("");
        const navigate = useNavigate();

        useEffect(() => {
            if (!username || username === "") {
                navigate("/");
            }
        }, []);

        const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
            if (error) {
                setError("");
            }
        }

        const onAuthenticationError = (error: string) => {
            setError(error);
        }

        const login = (password: string) => {
            authenticate(username, password, onAuthenticationError)
                .then(token => {
                    if(token !== "") {
                        navigate("/");
                        dispatch({type: "login", token})
                    }
                });
        };

        return (
            <>
                <Grid item textAlign={"center"}>
                    <Typography variant={"h4"}>Quick Login</Typography>
                </Grid>

                <Grid item container direction={"row"} justifyContent={"center"} sx={{marginTop: 4}}>
                    <Avatar sx={{width: 80, height: 80}}>B</Avatar>
                </Grid>

                <Grid item textAlign={"center"} sx={{marginTop: 2}}>
                    <Typography variant={"h6"}>{username}</Typography>
                </Grid>

                <Grid item container direction={"row"} justifyContent={"center"} sx={{marginTop: 2}}>
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={onPasswordChange}
                        error={error !== ""}
                        helperText={error}
                    />
                </Grid>

                <Grid item container direction={"row"} justifyContent={"center"} sx={{marginTop: 3}}>
                    <Button variant={"contained"} onClick={() => login(password)}>Login</Button>
                </Grid>
                <Grid item textAlign={"center"} sx={{marginTop: 3}}>
                    <Link to={"/"}>This is not my account</Link>
                </Grid>
            </>
        );
    }
;

export default LoginPasswordPage;