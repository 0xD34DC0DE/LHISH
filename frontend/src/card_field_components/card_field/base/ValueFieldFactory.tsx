import {Field} from "../../Fields";
import {FieldMapper} from "./FieldMapper";

export interface ValueFieldFactoryProps {
    fields: (Field | null)[];
}

export const ValueFieldFactory = ({fields}: ValueFieldFactoryProps) => {

    const getFields = () => {
        return fields.map((field, i) =>
            <FieldMapper key={i} field={field}/>
        );
    }

    return <>
        {getFields()}
    </>;
};