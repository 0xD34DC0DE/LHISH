import React, {useState} from "react";
import {Divider, TablePagination, Typography} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {yellow} from "@mui/material/colors";
import {CardMasonry} from "../components/CardMasonry";

const FavoritesPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, p: number) => {
    }

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    }

    const numbers = [150, 30, 90, 70, 90, 100, 150, 30, 50, 80];
    return <>
        <Typography sx={{
            display: "inline-flex",
            alignItems: "center",
            marginTop: 3
        }} variant={"h2"}>Favorites<StarIcon fontSize="inherit" sx={{color: yellow[600], ml: 3}}/></Typography>

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

        {/*TODO add column number change when going small (responsive)*/}
        <CardMasonry numbers={numbers}/>
    </>;
}

export default FavoritesPage