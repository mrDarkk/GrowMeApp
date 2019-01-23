import { Reference } from "@angular/fire/firestore";
import { Business } from "./business";

export interface User {
    FullName?: string;
    Email?: string;
    PhoneNumber?: string;
    Pincode?: number;
    Password?: string;
    ConfirmPassword?: string;
    Roles?: string[];
    IsActive?: boolean;
    Businesses?: Reference<Business>[];
    DateOfBirth?: Date;
    DateOfAnniversary?: Date;
    Gender?: string;
    Profession?: string;
    Photo?: string;
}