import {ValueField} from "./base/ValueField";
import {Box, Typography} from "@mui/material";

export interface TextFieldProps extends ValueField {
    value: string;
}

export const TextField = ({value, name}: TextFieldProps) => {
    return (
        <Box>
            <Typography variant="body2" display={"inline"}>{name}: </Typography>
            <Typography variant="body2" display={"inline"}>{value}</Typography>
        </Box>
    );
};