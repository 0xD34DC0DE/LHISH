import {useAuthGet} from "../hooks/QueryHooks";
import React, {useEffect} from "react";
import {DBMetricsView} from "../views/DBMetricsView";
import {Typography} from "@mui/material";

export interface DBMetricsProps {
    url: string;
    label: string;
}

export const DBMetrics = ({url, label}: DBMetricsProps) => {
    const [get, data, error, reset] = useAuthGet<DBMetricsView>(() => url);

    useEffect(() => {
        get();
    }, []);

    return (
        <>
            <Typography variant={"h5"}>{label} collection stats:</Typography>
            <Typography variant={'body1'}>Number of elements: {data?.count}</Typography>
            <Typography variant={'body1'}>Average size of elements: {data?.avgObjectSize} B</Typography>
            <Typography variant={'body1'}>Total size of collection: {data?.storageSize} KB</Typography>
        </>
    );
};