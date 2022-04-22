import {Field} from "../../Fields";

export interface ValueFieldInput {
    existingName: string | null;
    existingValue?: any;
    onFieldChange: () => void;
}