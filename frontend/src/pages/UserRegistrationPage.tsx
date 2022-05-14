import {Button, Grid, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {useInput} from "../hooks/InputHook";
import {useValidation} from "../hooks/ValidationHook";
import {ErrorMessage} from "../components/ErrorMessage";
import {useGet, usePost} from "../hooks/QueryHooks";
import AccountView from "../views/AccountView";

interface UserRegistrationPageProps {
}

const UserRegistrationPage = ({}: UserRegistrationPageProps) => {
        const [error, setError] = useState("");
        const navigate = useNavigate();

        const [getUserExists, userExists, userExistsError, userExistsReset] = useGet<boolean>(
            () => `http://localhost:8080/login/exists/${username}`
        );

        const [postUser, userResult, postUserError, postUserReset] =
            usePost<AccountView>("http://localhost:8080/user/register");

        const [username, setUsername] = useInput((value: string) => {
            setError("");
            userExistsReset();
            return value;
        });
        const [usernameValidation, usernameErrorProps] = useValidation(
            () => username == "" ? "Username is required" : null
        );

        const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const [email, setEmail] = useInput();
        const [emailValidation, emailErrorProps] = useValidation(
            () => {
                if (email == "") {
                    return "Email is required";
                }
                if (!emailRegex.test(email)) {
                    return "Email is not valid";
                }
                return null;
            }
        );

        const [password, setPassword] = useInput();
        const [passwordValidation, passwordErrorProps] = useValidation(
            () => password == "" ? "Password is required" : null
        );

        const [passwordConfirmation, setPasswordConfirmation] = useInput();
        const [passwordConfirmationValidation, passwordConfirmationErrorProps] = useValidation(
            () => {
                if (passwordConfirmation == "") {
                    return "Password confirmation is required";
                } else if (passwordConfirmation !== password) {
                    return "Password confirmation does not match password";
                }
                return null;
            }
        );

        useEffect(() => {
            setError(userExistsError ?? "");
        }, [userExistsError]);

        const register = () => {
            if (![usernameValidation(),
                emailValidation(),
                passwordValidation(),
                passwordConfirmationValidation()].every(v => v)) {
                return;
            }

            getUserExists();
        }

        useEffect(() => {
            if (userExists === null) {
                return;
            }
            if (userExists) {
                console.log("User exists");
                setError("Username already exists");
                return;
            }
            postUser(
                ["username", username],
                ["email", email],
                ["password", password]
            );
        }, [userExists]);

        useEffect(() => {
            if (!postUserError && userResult) {
                navigate("/")
            }
        }, [userResult]);

        return (
            <>
                <Grid item textAlign={"center"}>
                    <Typography variant={"h4"}>Register</Typography>
                </Grid>

                <Grid item container direction={"row"} justifyContent={"center"} sx={{marginTop: 2}}>
                    <Grid item container direction={"column"}>
                        <TextField
                            id="outlined-username-input"
                            label="Username"
                            type="text"
                            autoComplete="current-username"
                            variant="outlined"
                            onChange={setUsername}
                            {...usernameErrorProps}
                            sx={{marginBottom: 2}}
                        />
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            type="text"
                            autoComplete="current-email"
                            variant="outlined"
                            onChange={setEmail}
                            {...emailErrorProps}
                            sx={{marginBottom: 2}}
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            onChange={setPassword}
                            {...passwordErrorProps}
                            sx={{marginBottom: 2}}
                        />
                        <TextField
                            id="outlined-password-confirmation-input"
                            label="Password confirmation"
                            type="password"
                            autoComplete="current-password-confirmation"
                            variant="outlined"
                            onChange={setPasswordConfirmation}
                            {...passwordConfirmationErrorProps}
                            sx={{marginBottom: 2}}
                        />
                        <ErrorMessage enabled={error !== null}>{error?.toString()}</ErrorMessage>
                    </Grid>
                </Grid>

                <Grid item container direction={"row"} justifyContent={"center"} sx={{marginTop: 3}}>
                    <Button variant={"contained"} onClick={() => register()}>Register</Button>
                </Grid>
                <Grid item textAlign={"center"} sx={{marginTop: 3}}>
                    <Link to={"/"}>I already have an account</Link>
                </Grid>
            </>
        );
    }
;

export default UserRegistrationPage;