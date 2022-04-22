import {Field} from "../../Fields";

export interface FormFieldRef {
    getField: () => Field | null;
}