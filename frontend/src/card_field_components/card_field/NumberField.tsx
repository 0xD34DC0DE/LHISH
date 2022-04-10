import {Typography} from "@mui/material";
import {ValueField} from "./ValueField";

export interface NumberFieldProps extends ValueField {
    value: number;
}

export const NumberField = ({value, name}: NumberFieldProps) => {
    return (
        <>
            <Typography variant="body1" display={"inline"}>{name}</Typography>
            <Typography display={"inline"}>{value}</Typography>
        </>
    );
};