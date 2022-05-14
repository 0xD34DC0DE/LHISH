import {Stack, Switch, Typography} from "@mui/material";
import {PermissionView} from "../views/PermissionView";
import {ChangeEvent, useEffect, useState} from "react";
import {useAuthPost} from "../hooks/QueryHooks";

export interface PermissionToggleProps {
    permission: PermissionView;
}

export const PermissionToggle = ({permission}: PermissionToggleProps) => {
    const [checked, setChecked] = useState(permission.status);

    const [postToggle, permissionResult, permissionError, permissionReset] =
        useAuthPost<PermissionView>("http://localhost:8080/permission/toggle")


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        postToggle(
            ["id", permission.id],
        )
    };

    useEffect(() => {
        if(permissionResult !== null) {
            setChecked(permissionResult.status);
        }
    }, [permissionResult]);

    return (
        <Stack direction={"row"}>
            <Typography sx={{paddingTop: 1}}>{permission.name}</Typography>
            <Switch sx={{marginLeft: "auto"}} checked={checked} onChange={handleChange}/>
        </Stack>
    );
};