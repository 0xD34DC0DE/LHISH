import {SxProps, Theme, Typography} from "@mui/material";
import {red} from "@mui/material/colors";
import React, {FunctionComponent} from "react";

export interface ErrorMessageProps {
    enabled: boolean;
    sx?: SxProps<Theme>;
}

export const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({children, enabled, sx = undefined}) => {
    return (
        <>
            {enabled && <Typography sx={sx} color={red[500]}>{children}</Typography>}
        </>
    );
};
