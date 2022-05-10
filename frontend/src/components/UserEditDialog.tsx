import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import AccountView from "../views/AccountView";
import DialogBase, {DialogBaseRef} from "./DialogBase";
import {Box, Button, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {ErrorMessage} from "./ErrorMessage";
import {useAuthPost, useAuthPut} from "../hooks/QueryHooks";
import {SuccessMessage} from "./SucessMessage";

export interface UserEditDialogRef {
    openDialog: (account: AccountView) => void;
    closeDialog: () => void;
}

export interface UserEditDialogProps {

}

export const UserEditDialog = forwardRef<UserEditDialogRef, UserEditDialogProps>(
    ({}: UserEditDialogProps, ref) => {
        const dialogBaseRef = useRef<DialogBaseRef>(null);
        const [account, setAccount] = useState<AccountView>();
        const [password, setPassword] = useState<string>("");

        const [putUser, user, userError, userReset] = useAuthPut("http://localhost:8080/user/update");

        useImperativeHandle(ref, () => ({
            openDialog: (account: AccountView) => {
                setAccount(account);
                dialogBaseRef.current?.openDialog();
            },
            closeDialog: () => {
                dialogBaseRef.current?.closeDialog();
            }
        }));

        const saveEditedUser = () => {
            if (!account)
                return;

            putUser(
                ["id", account.id],
                ["username", account.username],
                ["email", account.email],
                ["password", password === "" ? null : password]
            )
        };

        useEffect(() => {
            userReset();
        }, []);

        return (
            <DialogBase ref={dialogBaseRef} fullWidth maxWidth={"xs"}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent sx={{paddingLeft: 4, paddingRight: 4}}>
                    <TextField
                        margin="dense"
                        id="username"
                        value={account?.username}
                        label={"Username"}
                        type="text"
                        fullWidth
                        onChange={(e) => {
                            setAccount({...account, username: e.target.value} as AccountView);
                        }}
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        margin="dense"
                        id="username"
                        value={account?.email}
                        label={"Email"}
                        type="text"
                        fullWidth
                        onChange={(e) => {
                            setAccount({...account, email: e.target.value} as AccountView);
                        }}
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        value={password ?? ""}
                        label={"Password"}
                        type="text"
                        fullWidth
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        sx={{marginBottom: 2}}
                    />
                </DialogContent>
                <DialogActions>
                    <Box sx={{marginLeft: 2, marginRight: "auto"}}>
                        <SuccessMessage enabled={user != null}>User updated</SuccessMessage>
                    </Box>
                    <Button
                        variant={"contained"}
                        onClick={saveEditedUser}
                    >Save</Button>
                </DialogActions>
            </DialogBase>
        );
    }
);