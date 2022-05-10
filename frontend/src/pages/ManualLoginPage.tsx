import {Avatar, Button, Grid, Link, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {checkUsernameExists} from "../services/SessionService";
import {PermissionGuard} from "../components/PermissionGuard";
import {PermissionNames} from "../views/PermissionNames";

interface ManualLoginPageProps {
    username: string,
    setUsername: (userId: string) => void
}

export const ManualLoginPage = ({username, setUsername}: ManualLoginPageProps) => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
        if (error) {
            setError("");
        }
    }

    const onSubmit = () => {
        checkUsernameExists(username).then(exits => {
            if(exits) {
                navigate("/authentication");
                return;
            }
            setError("Username doesn't exists");
        })
    }

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
                    onChange={onUsernameChange}
                    error={error != ""}
                    helperText={error}
                />
            </Grid>
            <Grid item container direction={"row"} justifyContent={"center"} sx={{marginTop: 4}}>
                    <Button onClick={onSubmit} variant={"contained"}>Continue</Button>
            </Grid>

            <PermissionGuard permissionName={PermissionNames.UserCreateAccount}>
                <Grid item textAlign={"center"} sx={{marginTop: 5}}>
                    <Link href={"/register"}>I don't have an account</Link>
                </Grid>
            </PermissionGuard>
        </>
    );
};

export default ManualLoginPage;