export class UserModel {
    uid: string;
    email: string;
    fullName: string;
    createdTime?: number;
    status?: string;
    userType: AccountType;
    notification_token_id?: string;
    clappingCounter?: number;
    commentCounter?: number;
};

export class AccountType {
    usertype: string;
    gradFaculty?: string;
    gradYear?: string;
    specialty?: string;
    location?: string;
    fees?:number;
}
