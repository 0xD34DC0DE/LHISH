
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
}