import {useAuthGet} from "../hooks/QueryHooks";
import React, {useEffect} from "react";
import {Box, Divider, Stack, Typography} from "@mui/material";
import {PermissionToggle} from "../components/PermissionToggle";
import {PermissionView} from "../views/PermissionView";

export interface AdminPermissionPageProps {

}

export const AdminPermissionPage = ({}: AdminPermissionPageProps) => {

    const [getPermissions, permissions, permissionsError, permissionsReset] =
        useAuthGet<PermissionView[]>("http://localhost:8080/permission/all");

    useEffect(() => {
        permissionsReset();
        getPermissions();
    }, []);

    return (
        <Box maxWidth={"md"}>
            <Typography variant={"h3"} sx={{marginTop: 2, marginBottom: 2}}>Permissions: </Typography>
            <Stack
                divider={<Divider orientation="horizontal"/>}
                spacing={2}>
                {
                    permissions?.map((permission) => (
                        <PermissionToggle permission={permission} key={permission.id}/>
                    ))
                }
            </Stack>
        </Box>
    );
};