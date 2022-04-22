import {Field} from "../card_field_components/Fields";
import {ValueType} from "../card_field_components/ValueTypes";

export enum Availability {
    Available,
    Taken,
    Empty,
    Unknown
}

export default interface IItem {
    id?: string | null,
    name: string,
    description: string,
    imageId?: string | null,
    availability?: Availability | null,
    historyId?: string | null,
    fields?: (Field | null)[],
}

// Required because of the way objects are stored in the backend
// the field "value" needs to be destructured into a field to become an IItem
export interface ItemDTO {
    id?: string | null,
    name: string | null,
    description: string | null,
    imageId?: string | null,
    historyId?: string | null,
    fields: {name: string, type: ValueType, value: (Field | null)}[]
}