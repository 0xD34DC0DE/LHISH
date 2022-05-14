import {useAuthGet} from "../hooks/QueryHooks";
import AccountView from "../views/AccountView";
import React, {useEffect, useRef} from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Button, Typography} from "@mui/material";
import {UserEditDialog, UserEditDialogRef} from "../components/UserEditDialog";

export interface AdminUsersPageProps {

}

export const AdminUsersPage = ({}: AdminUsersPageProps) => {
    const [getUsers, users, usersError, usersReset] = useAuthGet<AccountView[]>("http://localhost:8080/user/all");
    const userEditDialogRef = useRef<UserEditDialogRef>(null);

    useEffect(() => {
        getUsers();
    }, []);

    const columns: GridColDef[] = [
        {field: 'username', headerName: 'Username', flex: 0.2},
        {field: 'email', headerName: 'Email', flex: 0.55},
        {
            field: "Edit",
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            userEditDialogRef.current?.openDialog(cellValues.row as AccountView);
                        }}
                    >
                        Edit
                    </Button>
                );
            }
        }
    ]

    return (
        <>
            <Typography variant={"h3"} sx={{marginTop: 2, marginBottom: 2}}>Users: </Typography>
            {users && <DataGrid
                autoHeight
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                rowSpacingType={"border"}
            />}
            <UserEditDialog ref={userEditDialogRef}/>
        </>
    );
};