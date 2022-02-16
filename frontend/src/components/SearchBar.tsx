import {IconButton, InputBase, Paper} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";

type SearchBarPropTypes = {
    label?: string;
    onSubmit: (value: string) => void
};

export const SearchBar = ({label = "", onSubmit}: SearchBarPropTypes) => {
    return (
        <Paper
            sx={{py: '6', display: 'flex', alignItems: 'center', width: "100%"}}
        >
            <IconButton sx={{p: '10px'}} aria-label="menu">
                <SearchIcon/>
            </IconButton>
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder={label}
                inputProps={{'aria-label': label}}
            />
            <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                <ClearIcon/>
            </IconButton>
        </Paper>
    );
};