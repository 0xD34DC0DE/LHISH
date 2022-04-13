import {ValueField} from "./base/ValueField";
import {Box, Typography} from "@mui/material";

export interface NumberSymbolProps extends ValueField {
    symbol: string;
    value: number;
}

export const IntegerSymbolField = ({value, symbol, name}: NumberSymbolProps) => {
    return (
        <Box>
            <Typography variant="body2" display={"inline"}>{name}: </Typography>
            <Typography variant="body2" display={"inline"}>{value}</Typography>
            <Typography variant="body2" display={"inline"}>{symbol}</Typography>
        </Box>
    );
};