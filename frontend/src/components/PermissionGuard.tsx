import React, {useEffect} from "react";
import {useAuthGet, useGet} from "../hooks/QueryHooks";

export interface PermissionGuardProps {
    children: React.ReactNode;
    permissionName: string | null;
}

export const PermissionGuard = ({permissionName, children}: PermissionGuardProps) => {
    const [getPermission, permission, permissionError, permissionReset] = useGet<boolean>(
        `http://localhost:8080/permission/name/${permissionName}`
    );

    useEffect(() => {
        if(permissionName) {
            getPermission();
        }
    }, []);

    const getChildren = () => {
        if(!permissionName) {
            return children;
        }
        if (permission) {
            return children;
        }
        return null;
    }

    return (
        <>{getChildren()}</>
    );
};