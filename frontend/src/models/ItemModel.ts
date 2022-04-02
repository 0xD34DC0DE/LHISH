
export enum Availability {
    Available,
    Taken,
    Empty,
    Unknown
}

export default interface IItem {
    id: string,
    name: string,
    description: string, //TODO replace by ReactNodes made by the factory/renderer
    imageId: string,
    availability: Availability,
}