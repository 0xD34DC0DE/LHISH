import {Divider, TablePagination, Typography} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {yellow} from "@mui/material/colors";
import React, {useState} from "react";

type PageHeaderPropTypes = {
    title: string | React.ReactNode,
}

export const PageHeader = ({title}: PageHeaderPropTypes) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, p: number) => {
    }

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    }

    return (
        <>
            <Typography sx={{
                display: "inline-flex",
                alignItems: "center",
                marginTop: 3
            }} variant={"h2"}>{title}</Typography>

            <TablePagination
                component="div"
                count={100}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    ml: 0,
                    display: "flex",
                    "& .MuiToolbar-root": {
                        paddingLeft: 0.5,
                    }
                }}
            />
            <Divider sx={{marginBottom: 3}}/>
        </>

    )
        ;
};