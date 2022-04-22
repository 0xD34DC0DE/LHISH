
export enum ValueType {
    INTEGER = 'INTEGER',
    FLOAT = 'FLOAT',
    STRING = 'STRING',
    INTEGER_SYMBOL = 'INTEGER_SYMBOL',
    FLOAT_SYMBOL = 'FLOAT_SYMBOL',
    FILE = 'FILE',
    IMAGE = 'IMAGE',
}

// workaround because json doesn't convert correctly to enum
export const valueTypeFromString = (valueType: string): ValueType => {
    switch (valueType) {
        case 'INTEGER':
            return ValueType.INTEGER;
        case 'FLOAT':
            return ValueType.FLOAT;
        case 'STRING':
            return ValueType.STRING;
        case 'INTEGER_SYMBOL':
            return ValueType.INTEGER_SYMBOL;
        case 'FLOAT_SYMBOL':
            return ValueType.FLOAT_SYMBOL;
        case 'FILE':
            return ValueType.FILE;
        case 'IMAGE':
            return ValueType.IMAGE;
        default:
            return ValueType.STRING;
    }
};