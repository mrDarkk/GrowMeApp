import { Datetime } from "@ionic/angular";

export interface Subscription {
    StartDate: Datetime;
    EndDate: Datetime;
    Name: string;
    IsActive: boolean;
    By: string;
    Code: string;
    Days: number;
    SubscriptionType: SubscriptionType;
    For: string;
}

export enum SubscriptionType {
    DiscountCouponCard = 0,
    BusinessDiscountScheme = 1
}