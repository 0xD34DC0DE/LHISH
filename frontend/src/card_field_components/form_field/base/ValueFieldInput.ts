import {Field} from "../../Fields";

export interface ValueFieldInput {
    existingName: string | null;
    onFieldChange: (field: Field) => void;
}