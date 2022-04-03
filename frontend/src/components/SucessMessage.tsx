import {SxProps, Theme, Typography} from "@mui/material";
import {green} from "@mui/material/colors";
import React, {FunctionComponent} from "react";

export interface SuccessMessageProps {
    enabled: boolean;
    sx?: SxProps<Theme>;
}

export const SuccessMessage: FunctionComponent<SuccessMessageProps> = ({children, enabled, sx = undefined}) => {
    return (
        <>
            {enabled && <Typography sx={sx} color={green[500]}>{children}</Typography>}
        </>
    );
};
