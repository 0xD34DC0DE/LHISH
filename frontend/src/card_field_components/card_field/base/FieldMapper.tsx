import {Field} from "../../Fields";
import {ValueType} from "../../ValueTypes";
import {TextField} from "../TextField";
import {IntegerField} from "../IntegerField";
import {IntegerSymbolField} from "../IntegerSymbolField";
import {FloatField} from "../FloatField";
import {FloatSymbolField} from "../FloatSymbolField";

export interface FieldMapperProps {
    field: Field | null;
}

export const FieldMapper = ({field}: FieldMapperProps) => {

    const getFieldNode = () => {
        if(field === null) {
            return null;
        }
        switch (field.type) {
            case ValueType.STRING:
                return <TextField {...field}/>;
            case ValueType.INTEGER:
                return <IntegerField {...field}/>;
            case ValueType.INTEGER_SYMBOL:
                return <IntegerSymbolField {...field}/>
            case ValueType.FLOAT:
                return <FloatField {...field}/>;
            case ValueType.FLOAT_SYMBOL:
                return <FloatSymbolField {...field}/>;
            default:
                return null;
        }
    }

    return getFieldNode();
};