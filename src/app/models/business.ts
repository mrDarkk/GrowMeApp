export interface Business {
    BusinessName?: string;
    Address?: Address;
    Logo?: string;
    Category?: string;
    SubCategory?: string;
    Timings?: Timing[];
    Emails?: string[];
    PhoneNumbers?: string[];
    IsActive?: boolean;
}
export interface Address {
    Line1?: string;
    Line2?: string;
    Line3?: string;
    Area?: string;
    City?: string;
    Pincode?: string;
    Country?: string;
    State?: string;
    MapLocation?: GeoPoint;
}
export interface Timing {
    Day?: string;
    Time?: Time[]
}
export interface GeoPoint {
    Latitude?: number;
    Longitude?: number;
}
export interface Time {
    To?: string;
    From?: string;
    FullTime?: boolean;
}

export interface Gender {
    data: GenderOption[];
}
export interface GenderOption {
    Text: string;
    Value: number;
}