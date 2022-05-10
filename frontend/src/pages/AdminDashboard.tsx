import {Divider, Typography} from "@mui/material";
import React from "react";
import {DBMetrics} from "../components/DBMetrics";

export interface AdminDashboardProps {

}

export const AdminDashboard = ({}: AdminDashboardProps) => {

    const endpoints = ["user", "category", "template"];

    const toTitleCase = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const toUrl = (endpoint: string) => {
        return `http://localhost:8080/${endpoint}/metrics`;
    };

    return (
        <>
            <Typography variant={"h3"} sx={{marginTop: 2, marginBottom: 2}}>Dashboard: </Typography>
            <Divider sx={{marginBottom: 2}}/>
            {endpoints.map((endpoint, i) => (
                <>
                    <DBMetrics url={toUrl(endpoint)} key={i} label={toTitleCase(endpoint)}/>
                    <Divider sx={{marginBottom: 2, marginTop: 2}}/>
                </>
            ))}
        </>
    );
};