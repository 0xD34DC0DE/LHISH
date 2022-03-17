import {Box, Button, Divider, TablePagination, Typography} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {yellow} from "@mui/material/colors";
import React, {useState} from "react";

type PageHeaderPropTypes = {
    title: string | React.ReactNode;
    onAddButtonClick?: () => void;
}

export const PageHeader = ({title, onAddButtonClick}: PageHeaderPropTypes) => {
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

            <Box sx={{display: "flex"}}>
                <TablePagination
                    component="div"
                    count={100}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        ml: 0,
                        display: "inline",
                        "& .MuiToolbar-root": {
                            paddingLeft: 0.5,
                        }
                    }}
                />
                {onAddButtonClick && <Box sx={{
                    marginRight: 4,
                    marginLeft: "auto",
                }}>
                    <Button variant={"contained"}
                            onClick={() => onAddButtonClick()}
                            sx={{
                                display: "flex",
                                flexGrow: "true",
                                marginRight: 0.5,
                                justifyContent: "center",
                                alignContent: "center",
                                flexDirection: "column"
                            }}>Add</Button>
                </Box>}
            </Box>
            <Divider sx={{marginBottom: 3}}/>
        </>
    );
};