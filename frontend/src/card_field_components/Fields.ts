import {ValueType} from "./ValueTypes";

// Discriminated union of all possible field types
export type Field =
    | TextField
    | IntegerField
    | IntegerSymbolField
    | FloatField
    | FloatSymbolField

export interface IField {
    type: ValueType;
    name: string;
}

export interface TextField extends IField {
    type: ValueType.STRING;
    value: string;
}

export interface IntegerField extends IField {
    type: ValueType.INTEGER;
    value: number;
}

export interface IntegerSymbolField extends IField {
    type: ValueType.INTEGER_SYMBOL;
    value: number;
    symbol: string;
}

export interface FloatField extends IField {
    type: ValueType.FLOAT;
    value: number;
}

export interface FloatSymbolField extends IField {
    type: ValueType.FLOAT_SYMBOL;
    value: number;
    symbol: string;
}

