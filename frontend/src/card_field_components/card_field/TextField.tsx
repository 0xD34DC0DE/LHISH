import {ValueField} from "./ValueField";
import {Typography} from "@mui/material";

export interface TextFieldProps extends ValueField {
    value: string;
}

export const TextField = ({value, name}: TextFieldProps) => {
    return (
        <>
            <Typography variant="body1" display={"inline"}>{name}</Typography>
            <Typography display={"inline"}>{value}</Typography>
        </>
    );
};