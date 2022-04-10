import {ValueField} from "./ValueField";
import {Typography} from "@mui/material";

export interface NumberSymbolProps extends ValueField {
    symbol: string;
    value: number;
}

export const NumberSymbolField = ({value, symbol, name}: NumberSymbolProps) => {
    return (
        <>
            <Typography variant="body1" display={"inline"}>{name}</Typography>
            <Typography display={"inline"}>{value}</Typography>
            <Typography display={"inline"}>{symbol}</Typography>
        </>
    );
};