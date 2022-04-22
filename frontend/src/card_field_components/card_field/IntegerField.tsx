import {Box, Typography} from "@mui/material";
import {ValueField} from "./base/ValueField";

export interface FloatFieldProps extends ValueField {
    value: number;
}

export const IntegerField = ({value, name}: FloatFieldProps) => {
    return (
        <Box>
            <Typography variant="body2" display={"inline"}>{name}: </Typography>
            <Typography variant="body2" display={"inline"}>{value}</Typography>
        </Box>
    );
};